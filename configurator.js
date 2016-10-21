#!/usr/bin/env node
const fs = require('fs');
const prompt = require('prompt-sync')();
const os = require('os');
const chalk = require('chalk');
const supportedBoards = [
  {
    name: 'Adafruit\s Feather Huzzah',
    id: 'featherHuzzah'
  },
  {
    name: 'NodeMCU',
    id: 'NodeMCU'
  }
];
const filename = 'config.js';
const config = {};
let output = '';
const ifaces = os.networkInterfaces();
const ips = [];
let ipChoice = 0, boardChoice = 0;
Object.keys(ifaces).forEach(ifname => {
  ifaces[ifname]
    .filter(iface => iface.family === 'IPv4')
    .filter(iface => iface.address !== '127.0.0.1')
    .forEach(iface => {
      let result = {
        ifname: ifname,
        address: iface.address
      };
      ips.push(result);
    });
  });
config.ssid = prompt('What is your wireless SSID? ');
config.wifiPw = prompt('What is your wireless password? ');
console.log('Where will your API server be running?');
console.log('The following network interfaces were found: ');
ips.forEach((ip,index) => console.log(`${index}\) name: ${ip.ifname}\t\t\tIP address: ${ip.address}`));
console.log(`${ips.length}) Enter another address to use.`)
do {
  ipChoice = +prompt('Which network interface is running the server? ', 0);
} while ((!Number.isInteger(ipChoice)) || (ipChoice < 0 || ipChoice > ips.length));

if (ipChoice === ips.length) {
  do {
    config.address = prompt('Enter the IP address where the API will be running: ');
  } while (!/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(config.address));
} else {
  config.address = ips[ipChoice].address;
}
console.log('What board do you have?');
supportedBoards.forEach((board, index) => console.log(`${index}\) ${board.name}`));
do {
  boardChoice = +prompt('Which board are you using? ', 0);
} while ((!Number.isInteger(boardChoice)) || (boardChoice < 0 || boardChoice > supportedBoards.length));
config.board = supportedBoards[boardChoice].id;
output += `
var port = 9000;
var localIp = '${config.address}';
var url = 'http://' + localIp + ':' + port + '/button/';

module.exports = function () {
  return {
    board: '${config.board}',
    ssid: '${config.ssid}',
    wifiPw: '${config.wifiPw}',
    url: url
  };
}
`;

fs.writeFile(filename, output, err => {
  if(err) return console.log(err);
  console.log('Config file written!')
})
