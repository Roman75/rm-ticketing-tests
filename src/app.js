import Router from './router';
import $ from 'jquery';

/**
 * Application entry point
 */
class App {
	constructor() {
		$(document).ready(() => {
			$.getJSON('/config.json', (config) => {
				document.CONFIG = config;
				$.getScript(document.CONFIG.wss + '/socket.io/socket.io.js', (data, textStatus, jqxhr) => {
					document.SOCKET = io(document.CONFIG.wss, {
						transports: ['websocket', 'polling']
					});
					document.SOCKET.on('event-fetch', (res) => {
						console.log('event-fetch');
						console.log(res[0]);
					});
					document.SOCKET.on('event-fetch-err', (err) => {
						console.log('event-fetch-err');
						console.log(err);
					});
					document.SOCKET.on('connect', () => {
						console.log('connect');
					});
					document.ROUTER = new Router();
				});
			});
		});
	}
}

new App();
