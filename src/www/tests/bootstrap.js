/**
 * basic implementation for all sites
 */

// gloabl configuration
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

var socket;

$.getJSON('config.js', (config) => {
	this.CONFIG = config;
	loadScript(this.CONFIG.socket_url + '/socket.io/socket.io.js', () => {
		socket = io(this.CONFIG.socket_url, {
			transports: ['websocket']
		});

		socket.on('reconnect_attempt', function() {
			socket.io.opts.transports = ['polling', 'websocket'];
		});

		socket.on('connect', function() {
			//connect(socket);
			//if (typeof events !== 'undefined') {
			//	events(socket);
			//}
		});

		socket.on('register', function(res) {
			if (typeof register !== 'undefined') {
				register(res);
			}
		});

		socket.on('user-logout', function() {
			//window.location.href = '/tests/';
		});

		socket.on('err', function(err) {
			console.warn(err);
			if (err.message) {
				var $err = $('#err');
				if ($err.length) {
					$err.html(err.message);
				} else {
					alert(err.message);
				}
			}
		});

		socket.on('disconnect', function() {
			window.location.reload();
		});

		$('button').mousedown(function() {
			$('#err').html('');
		});

		$('body').append('<div id="err" style="color: red;"></div>');

		window.setTimeout(() => {
			let data = {
				form_id: 'mock_form',
				id: 28
			}
			socket.emit('form-init', data);
		}, 100);

		socket.on('form-init', function(res) {
			console.log('form-init', res);
			//let myForm = new dhtmlXForm("myForm", res.formData);
		});

		socket.on('record-fetch', function(res) {
			console.log('record-fetch', res);
		});
	});
});
