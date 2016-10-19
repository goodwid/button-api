var buttons = [0,2,4,5,12,13,14,15];
var config = require('./config');
if (!config) {
  console.log('Config not found!');
  process.exit(1);
}
var http = require('http');
var wifi = require('Wifi');
var options = {
  repeat: true,
  edge: 'rising'
}
wifi.connect(config.ssid, {password:config.wifiPw}, function(err){
  if (err) {
    return console.log('error: ', err);
  }
  console.log('Connection info: ', wifi.getIP());
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

buttons.forEach(function(pin) {
  pinMode(pin, 'input_pullup');
  setWatch(handler, pin, options);
});
