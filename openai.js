// 0bd3b13074784e4db8fc0b9cb60995fe
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const { Buffer } = require('buffer');
const { PassThrough } = require('stream');
const fs = require('fs');
const config = require("./config.json");

// textToSpeech("0bd3b13074784e4db8fc0b9cb60995fe", "eastus", "test test 123", "funny.mp3")

// textToSpeech("hello", "./temp/test.mp3");

async function textToSpeech(text, filename) {
    const key = config.AZURE_TOKEN;
    const region = "eastus"; // you may have to change this...
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechSynthesisOutputFormat = 5; // mp3

    let audioConfig = null;

    if (filename) {
        audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    }

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(text, result => {
        const { audioData } = result;

        synthesizer.close();
        
        if (filename) {
            
            // return stream from file
            const audioFile = fs.createReadStream(filename);
            resolve(audioFile);
            
        } else {
            
            // return stream from memory
            const bufferStream = new PassThrough();
            bufferStream.end(Buffer.from(audioData));
            resolve(bufferStream);
        }
    })
}
module.exports = {
    textToSpeech
};