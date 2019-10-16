import Http from './http';
import RmLog from "rm-log";
import yaml from 'js-yaml';
import fs from 'fs';
import _ from 'lodash';

let log, config = null;
const logPrefix = 'scanner ';

try {
	config = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'));
	if (config.log) {
		log = new RmLog(config.log);
		log.msg(logPrefix, config);
	} else {
		config = null;
		console.error('no config for log found.');
	}
} catch (e) {
	console.error(e);
	new Error('no configuration file config.yaml found!');
	process.exit(1);
}

global.LOG = new RmLog(config.log);

function start() {
	if (config) {
		new Http(config.http);
	} else {
		log.err(logPrefix, 'no configuration found');
	}
}

setTimeout(() => {
	start();
}, config.server.sleep);