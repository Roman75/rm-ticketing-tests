import Router from './router';
import io from 'socket.io-client';
import $ from 'jquery';
import _ from 'lodash';

let socket = null;

$(document).ready(() => {
	let router = new Router();
	$.getJSON('/config.json', function(config) {
		socket = io(config.wss, {
			transports: ['websocket', 'polling']
		});
		socket.on('connect', () => {
			console.log('connect');
		});
	});
});
