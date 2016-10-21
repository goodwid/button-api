### Button Press sends GET request to Express Server
This project will connect your controller to wifi, and connect to an Express server running on your computer,

##### Prerequisites

1. You will need a supported ESP8266 microcontroller.  Preconfigured boards, thus far, are:
  - [Adafruit's Feather Huzzah](https://learn.adafruit.com/adafruit-feather-huzzah-esp8266/overview)
  - [NodeMCU](http://www.electrodragon.com/product/nodemcu-lua-amica-r2-esp8266-wifi-board/)
1. Your hardware should be flashed with [ThingsSDK Flasher.js](https://github.com/thingsSDK/flasher.js) using the latest [Espruino JS runtime](http://www.espruino.com/EspruinoESP8266).
1. You should have [ThingsSDK-cli](https://github.com/thingsSDK/thingssdk-cli) installed.

##### board setup
On a breadboard, connect 3v and ground to the rails, then wire ground to button to pin (except pin 15 on Feather Huzzah, which has a built-in pulldown resistor and needs to be wired to 3v rail).

##### deploy
clone this repo, edit the skeleton.config.js to add your local environment information, then run the following:

<pre>
npm i
npm run projectInit
thingssdk devices
npm run push
</pre>

In another terminal, run `node api` to start the Express Server.

Now, press a button!

##### known issues
- if you add `debounce` to the options object passed to `setWatch`, the `e` object passed to the handler function no longer contains the `pin` property.

##### known bugs
- debouncing issues with pins other than 15 on Feather Huzzah.  One press can get you multiple API calls.
