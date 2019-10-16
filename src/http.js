import fs from 'fs';
import http from 'http';
import https from 'https';
import url from 'url';
import mime from 'mime';
import _ from 'lodash';

const logPrefix = 'scanner ';

class Http {

	/**
	 * http(s) server
	 * @param config {Object} configuration
	 */
	constructor(config) {

		this._config = config;

		if (this._config.ssl) {
			this._http = https.createServer({
				key: fs.readFileSync(this._config.ssl.key, 'utf8'),
				cert: fs.readFileSync(this._config.ssl.cert, 'utf8')
			}).listen(config.port);
		} else {
			this._http = http.createServer().listen(config.port);
		}

		this._http.on('request', (req, res) => {

			let documentRoot = __dirname + '/www';
			let urlParse = url.parse(req.url, true);
			let pathname = urlParse.pathname;
			let hostArray = (req && req.headers && req.headers.host) ? req.headers.host.split('.') : null;

			let urlPath = (pathname.slice(-1) !== '/') ? pathname : pathname + 'index.html';
			let encoding = '';
			let file = false;
			try {
				let mimeType = mime.getType(documentRoot + urlPath);
				if (mimeType === 'text/html') {
					encoding = 'utf8';
				}
				if (!file) {
					file = fs.readFileSync(documentRoot + urlPath, encoding);
					res.setHeader("Content-Type", mimeType);
				}
				LOG.msg(logPrefix, urlPath + ' ' + mimeType);
				res.writeHead(200);
				res.end(file);
			} catch (e) {
				LOG.err(logPrefix, urlPath);
				res.writeHead(404);
				res.end()
			}
			//}
		});
	}
};

module.exports = Http;
