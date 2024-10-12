const tmi = require('tmi.js');
const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const obsStuff = require("./obs_stuff");
const openai = require("./openai");
const config = require("./config.json");
const fs = require("fs");

const app = express();
app.use(express.static('static'));
const server = http.createServer(app);
const io = new Server(server);

console.log(require.main.filename.split("twitch_chat.js")[0]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for the 'selectChatterPlzz' event from the client
    socket.on('selectChatterPlz', function() {
        selectChatter();
    });
	socket.on('resetChatterPlz', function() {
        resetChatters();
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
obsStuff.con();
const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: config.TWITCH_CHANNEL,
		password: 'oauth:'+config.TWITCH_TOKEN
	},
	channels: [ config.TWITCH_CHANNEL ]
});

let activeChatter = false;
let currentActive = "none";
let participating = [];

client.connect().catch(console.error);
client.on('message', async (channel, tags, message, self) => {
	if(self) return;
	if (message == "!player1" && !activeChatter && participating.lastIndexOf(tags.username) == -1) {
		participating.push(tags.username);
	} else if (activeChatter && currentActive == tags.username) {
		io.emit("newChatMsg", message);
		const fileNameFunnys = tags.username+"_"+Date.now().toString()+".mp3";
		await openai.textToSpeech(message, "./temp/"+fileNameFunnys);
		await sleep(750);
		await obsStuff.setMediaPath(require.main.filename.split("twitch_chat.js")[0]+"temp/"+fileNameFunnys, config.OBS_MEDIAPLAYER);
		await obsStuff.playMedia(config.OBS_MEDIAPLAYER);
		console.log("audio");
	}
	console.log(participating.toString());
});

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});

// funcs
function resetChatters() {
	participating = [];
	activeChatter = false;
	currentActive = "none";
	io.emit("resetChatter");
	const temp = fs.readdirSync("./temp");
	for (let i = 0; i < temp.length; i++) {
		fs.unlink("./temp/"+temp[i], (err) => {
			console.log("FS Error: "+err);
		});
	}
}
async function selectChatter() {
	currentActive = participating[Math.floor(Math.random()*participating.length)];
	activeChatter = true;
	io.emit("newChatter", currentActive);
	console.log(currentActive+" was picked!");
}