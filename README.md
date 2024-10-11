# Twitch Stuff
A port of some of DougDougs twitch stuff. (Currently just ChatGodApp)
## Setup
`1.)` Get your Twitch token. This can be generated with websites like [Twitch Token Generator](https://twitchtokengenerator.com/) OR in Chrome DevTools with the Network tab (if you know what your doing, this can be easier)

`2.)` Open `config.json`

`3.)` Replace `TWITCH_CHANNEL` with your channel name, and `TWITCH_TOKEN` with your OAuth / Access Token

![image](https://github.com/user-attachments/assets/5386cf26-a592-4f97-8bdd-76bbf5153bff)

`4.)` Get a [Microsoft Azure](https://azure.microsoft.com/) account (for free :D), create the Speech service, and copy the token, and paste that in `AZURE_TOKEN`.

`5.)` Enable OBS Websockets, make sure port is `4455`, and set `OBS_WS_PASSWORD` to your OBS Websocket password.

![image](https://github.com/user-attachments/assets/b73daf6f-a5dc-4c86-94ca-ef035c3c8039)

`6.)` Create a `Media Source` in OBS, call it `GodMedia` (this can be different, but GodMedia is easier as it's already set). If your name is different, set `OBS_MEDIAPLAYER` to your Media Source name.

### OPTIONAL: Moving images based on audio waveform
`7.)` Install the [OBS Move plugin](https://obsproject.com/forum/resources/move.913/), and in your Media Source, add the `Audio Move` filter. 

![image](https://github.com/user-attachments/assets/1b56b30e-ff0d-4d4f-84ca-0ae5ff904909)

`8.)` Play around with the options, but set `Scene` to your scene, and `Source` to an Image Source.

## Running
`1.)` run `npm i`

`2.)` run `node twitch_chat`

`3.)` Create an OBS `Browser Source`, and set the URL to `localhost:3000/chatmessage.html`

(You can use the crop filter to crop control panel part)

`4.)` Open an actual browser of your choice, and go to `localhost:3000/chatmessage.html`. This is because there's a control panel there to make your life easier ;)

## Usage Example
[![Watch the video](https://github.com/user-attachments/assets/08830f2b-82f6-4b94-8502-18859283412d)](https://www.youtube.com/embed/6QJe7r8zojc)
