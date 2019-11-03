import Router from './router';
import $ from 'jquery';

/**
 * Application entry point
 */
class App {
	constructor() {
		this.config = {};
		this.socket = {};
		this.router = {};

		$(document).ready(() => {
			this.router = new Router();
			$.getJSON('/config.json', (config) => {
				this.config = config;

				$.getScript(this.config.wss + '/socket.io/socket.io.js', (data, textStatus, jqxhr) => {
					this.socket = io(this.config.wss, {
						transports: ['websocket', 'polling']
					});
					this.socket.on('connect', () => {
						console.log('connect');
					});
				});
			});
		});
	}
}

new App();
