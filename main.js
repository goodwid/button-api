
import configMaker from './config';
const config = configMaker();
import boards from './boards';

// Array containing all the pins to activate for buttons.
// Customize this for your own needs if what's here doesn't work.
const buttons = boards(config.board);

const http = require('http');
const wifi = require('Wifi');
const options = {
  repeat: true,
  edge: 'rising'
};

wifi.connect(config.ssid, {password:config.wifiPw}, err => {
  if (err) {
    return console.log('wifi connect error: ', err);
  }
  console.log('Wireless network connection successful!\n * IP Address is', wifi.getIP().ip);
});

function handler (e) {
  http.get(config.url + e.pin, function(res) {
    var content = '';
    res.on('data', function(data) {
      content += data;
    });
    res.on('close', function() {
      console.log(content);
    });
  });
}

buttons.forEach(pin => {
  console.log('registering pin '+ pin);
  pinMode(pin, 'input_pullup');
  setWatch(handler, pin, options);
});
