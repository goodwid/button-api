#!/usr/bin/env node

const fs = require('fs');
const filename = 'config.js';
const inquirer = require('inquirer');
const os = require('os');
const ifaces = os.networkInterfaces();
const interfaces = Object.keys(ifaces).forEach(ifname => {
  ifaces[ifname]
    .filter(iface => iface.family === 'IPv4')
    .map(iface => {
      let result = {
        ifname: ifname,
        address: iface
      };
      return result;
    });
  });


console.log(interfaces);
// var configData = {
//   port: 0,
//   localIp: '',
//   url: 'http://'
// };
