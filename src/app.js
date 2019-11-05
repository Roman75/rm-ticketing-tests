import Router from './router';
import $ from 'jquery';
import _ from 'lodash';

/**
 * Application entry point
 */
class App {
	constructor() {
		$(document).ready(() => {
			$.getJSON('/config.json', (config) => {
				document.CONFIG = config;
				$.getScript(document.CONFIG.wss + '/socket.io/socket.io.js', (data, textStatus, jqxhr) => {

					// init socket server connection
					document.SOCKET = io(document.CONFIG.wss, {
						transports: ['polling']
					});

					// register ALL socket server events
					document.SOCKET.on('event-fetch', (res) => {
						console.log('event-fetch');
						console.log(res[0]);
					});
					document.SOCKET.on('event-fetch-err', (err) => {
						console.log('event-fetch-err');
						console.log(err);
					});

					document.SOCKET.on('event-fetch-all', (res) => {
						console.log('event-fetch-all');
						console.log(res);
						const EventsList = $('#EventsList');
						EventsList.empty();
						_.each(res, (Event) => {
							EventsList.append('<li><a href="/event/fetch/' + Event.EventID + '">' + Event.EventName + '</a></li>');
						});
					});
					document.SOCKET.on('event-fetch-all-err', (err) => {
						console.log('event-fetch-all-err');
						console.log(err);
					});


					// connect to socket server
					document.SOCKET.on('connect', (res) => {
						this._start();
					});
				});
			});
		});
	}

	_start() {
		document.ROUTER = new Router();

	}
}

new App();
