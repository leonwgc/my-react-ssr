import fs from 'fs';
import path from 'path';
import process from 'process';
import chalk from 'chalk';
const argv = require('yargs').argv;

const cfg = argv.cfg || 'pc'; // ./config/index.pc.js

if (!cfg) {
  exit('cfg is required');
}
const configFile = path.resolve(`./config/index.${cfg}.js`);
if (!fs.existsSync(configFile)) {
  exit(`${configFile} not exist`);
}

const configObject = require(`./config/index.${cfg}`);
const ssrModules = Object.keys(configObject);

if (!ssrModules.length) {
  exit(`please config modules to prerender in ./config/index.${cfg}.js`);
}
const ssrRenderers = Object.create(null);

for (let mod of ssrModules) {
  if (fs.existsSync(path.resolve(`./src/${mod}/index.ssr.jsx`))) {
    ssrRenderers[mod] = require(`./src/${mod}/index.ssr.jsx`).default;
  } else {
    exit(`${mod} ssr file not found under ./ssr`);
  }
}

function exit(error) {
  console.log(chalk.red(error));
  process.exit(9);
}

export default ssrRenderers;
