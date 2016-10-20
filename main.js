var config = require('./config')();
var board = require('./boards')
var buttons = board(config.board);

var http = require('http');
var wifi = require('Wifi');
var options = {
  repeat: true,
  edge: 'rising'
};

wifi.connect(config.ssid, {password:config.wifiPw}, function(err){
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

buttons.forEach(function(pin) {
  console.log('registering pin '+ pin);
  pinMode(pin, 'input_pullup');
  setWatch(handler, pin, options);
});
