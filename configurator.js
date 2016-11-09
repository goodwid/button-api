#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const prompt = require('prompt-sync')();
const scanner = require('wifiscanner')();

const supportedBoards = [
  {name: 'Adafruit\'s Feather Huzzah',id: 'featherHuzzah'},
  {name: 'NodeMCU',id: 'NodeMCU'}];
const filename = 'config.js';
const config = {};
const ifaces = os.networkInterfaces();
const ips = [];

let output = '', ssidChoice = 0,ipChoice = 0, boardChoice = 0;

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

scanner.scan((err, networks) => {
  if (err) console.log(chalk.red.bold(err));
  ssids = networks.map(network => network.ssid).sort().filter((el, pos, self) => self.indexOf(el) === pos);
  console.log(chalk.bold.yellow('The following wireless addresses were found:'));
  ssids.forEach((ssid, index) => {
    console.log(chalk.green(`${index}\) name: ${ssid}`));
  });
  do {
    ssidChoice = +prompt(chalk.bold.yellow('Select the wireless network to use: '));
  } while ((!Number.isInteger(ssidChoice)) || (ssidChoice < 0 || ssidChoice > ssids.length));
  config.ssid = ssids[ssidChoice];
  config.wifiPw = prompt(chalk.bold.yellow('Enter your wireless password: '));
  console.log(chalk.bold.yellow('\nThe following network interfaces were found:'));
  ips.forEach((ip,index) => console.log(chalk.green(`${index}\) name: ${ip.ifname}\t\t\tIP address: ${ip.address}`)));
  console.log(chalk.green(`${ips.length}) Enter another address to use.`));
  do {
    ipChoice = +prompt(chalk.bold.yellow('Select an interface to use: '), 0);
  } while ((!Number.isInteger(ipChoice)) || (ipChoice < 0 || ipChoice > ips.length));

  if (ipChoice === ips.length) {
    do {
      config.address = prompt(chalk.bold.yellow('Enter the IP address where the API will be running: '));
    } while (!/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(config.address));
  } else {
    config.address = ips[ipChoice].address;
  }
  console.log(chalk.bold.yellow('Preconfigured boards:'));
  supportedBoards.forEach((board, index) => console.log(chalk.green(`${index}\) ${board.name}`)));
  do {
    boardChoice = +prompt(chalk.bold.yellow('Which board are you using? '), 0);
  } while ((!Number.isInteger(boardChoice)) || (boardChoice < 0 || boardChoice > supportedBoards.length));
  config.board = supportedBoards[boardChoice].id;
  output += `var port = 9000;
var localIp = '${config.address}';
var url = 'http://' + localIp + ':' + port + '/button/';

export default function () {
  return {
    board: '${config.board}',
    ssid: '${config.ssid}',
    wifiPw: '${config.wifiPw}',
    url: url
  };
}
`;

  fs.writeFile(filename, output, err => {
    if(err) return console.log(chalk.bold.red(err));
    console.log(chalk.bgRed.bold.yellow('Config file written!'));
  });
});
