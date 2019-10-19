/**
 * basic implementation for all sites
 */

// gloabl configuration
this.DEBUG = true;
this.CONFIG = {};

/**
 * load a script file and use callback
 * @param src
 * @param callback
 */
function loadScript(src, callback) {
	let script = document.createElement('script');
	script.src = src;
	script.onload = () => callback(script);
	document.head.append(script);
}

this.socket;

$.getJSON('config.js', (config) => {
	this.CONFIG = config;
	this.CONFIG.socket.server = this.CONFIG.socket.url + ((this.CONFIG.socket.port) ? ':' + this.CONFIG.socket.port : '');
	loadScript(this.CONFIG.socket.server + '/socket.io/socket.io.js', () => {
		if (this.DEBUG) console.log('config', this.CONFIG);

		this.socket = io(this.CONFIG.socket.server, {
			transports: ['websocket', 'polling']
		});

		this.socket.on('reconnect_attempt', function() {
			socket.io.opts.transports = ['websocket', 'polling'];
		});

		this.socket.on('connect', function() {
			if (this.DEBUG) console.log('socket connect');
			//connect(socket);
			//if (typeof events !== 'undefined') {
			//	events(socket);
			//}
		});

		this.socket.on('err', function(err) {
			if (this.DEBUG) console.warn('socket err', err);
			if (err.message) {
				var $err = $('#err');
				if ($err.length) {
					$err.html(err.message);
				} else {
					alert(err.message);
				}
			}
		});

		this.socket.on('disconnect', function() {
			if (this.DEBUG) console.log('socket disconnect');
		});
	});
});
