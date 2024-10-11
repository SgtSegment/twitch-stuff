const OBSWebSocket = require('obs-websocket-js').OBSWebSocket;
const config = require("./config.json");

const obs = new OBSWebSocket();
let connected = false;

async function con() {
    try {
        await obs.connect("ws://127.0.0.1:4455", config.OBS_WS_PASSWORD);
        console.log("Connected successfully to OBS!");
        connected = true;
        // await setMediaPath("C:/Users/Jordan/Downloads/2498f61c-c2c9-4bfd-afbe-a79516a154d7.wav", "GodMedia");
        // playMedia("GodMedia");
    } catch {
        console.log("Failed to connect to OBS.");
    }
}

async function setMediaPath(path, element) {
    if (!connected)
        return;
    obs.callBatch([
        {
            requestType: "SetSourceFilterEnabled",
            requestData: {filterName: "Audio Move", filterEnabled: true, sourceName: element}
        },
        {
            requestType: "SetInputSettings",
            requestData: {inputName: element, inputSettings:{"local_file":path}}
        }
    ]);
}
async function playMedia(element) {
    if (!connected)
        return;
    obs.call("TriggerMediaInputAction", {inputName: element, mediaAction: "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART"});
}

module.exports = {
    con, setMediaPath, playMedia
}