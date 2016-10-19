var port = 9000;
var localIp = '192.168.1.100';
var url = 'http://' + localIp + ':' + port + '/button/';

module.exports = function() {
  return {
    board: 'featherHuzzah',
    ssid: 'SSID here',
    wifiPw: 'wifi pw here',
    url: url
  };
};
