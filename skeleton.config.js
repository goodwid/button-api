var port = 9000;
var localIp = '192.168.1.100';

module.exports = {
  board: 'featherHuzzah',
  ssid: 'SSID here',
  wifiPw: 'wifi PW here',
  url: `http://${localIp}:${port}/button/``
}
