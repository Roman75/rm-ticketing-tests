/**
 * basic implementation for all sites
 */

// gloabl configuration
this.DEBUG = true;
this.CONFIG = {};
this.wait = 10000;

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

var counter = 1;

function count() {
	console.log(counter);
	window.setTimeout(() => {
		counter++;
		if (((this.wait / 1000) + 5) >= counter) {
			count();
		}
	}, 1000);
}

this.socket;

$.getJSON('/config.js', (config) => {
	this.CONFIG = config;
	this.CONFIG.socket.server = this.CONFIG.socket.url + ((this.CONFIG.socket.port) ? ':' + this.CONFIG.socket.port : '');
	loadScript(this.CONFIG.socket.server + '/socket.io/socket.io.js', () => {
		if (this.DEBUG) console.log('config', this.CONFIG);

		this.socket = io(this.CONFIG.socket.server, {
			transports: ['websocket', 'polling']
		});

		this.socket.on('reconnect_attempt', () => {
			socket.io.opts.transports = ['websocket', 'polling'];
		});

		this.socket.on('sockets-tests-long-request', (res) => {
			console.log(counter, res);
		}); // milliseconds over respond

		this.socket.on('sockets-tests-long-request-err', (err) => {
			console.log(err);
		}); // error occurred

		this.socket.on('connect', () => {
			if (this.DEBUG) console.log('socket connect');
			console.log('socket.id', this.socket.id);
			count();
			this.socket.emit('sockets-tests-long-request', {
				'Timeout': this.wait		// wait and respond in milliseconds
			});
		});

		this.socket.on('err', (err) => {
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

		this.socket.on('disconnect', () => {
			if (this.DEBUG) console.log('socket disconnect');
		});
	});
});
