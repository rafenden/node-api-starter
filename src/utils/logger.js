const clc = require('cli-color');

function currentDate() {
  return new Date().toISOString();
}

function error(message) {
  const date = clc.red(currentDate());
  console.error(date, message);
}

function warn(message) {
  const date = clc.yellow(currentDate());
  console.warn(date, message);
}

function log(message) {
  const date = clc.blue(currentDate());
  console.log(date, message);
}

module.exports = { error, warn, log };