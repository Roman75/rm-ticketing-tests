import fs from 'fs';
import http from 'http';
import https from 'https';
import url from 'url';
import mime from 'mime';

const logPrefix = 'tests   ';

class Http {

	/**
	 * http(s) server
	 * @param config {Object} configuration
	 */
	constructor(config) {

		if (config.ssl) {
			this._http = https.createServer({
				key: fs.readFileSync(config.ssl.key, 'utf8'),
				cert: fs.readFileSync(config.ssl.cert, 'utf8')
			}).listen(config.port);
		} else {
			this._http = http.createServer().listen(config.port);
		}

		this._http.on('request', (req, res) => {

			let ret = null;
			let encoding = '';
			let mimeType = false;

			let documentRoot = __dirname + '/www';
			let urlParse = url.parse(req.url, true);
			let pathname = urlParse.pathname;

			let urlPath = (pathname.slice(-1) !== '/') ? pathname : pathname + 'index.html';

			try {
				if (!mimeType) {
					mimeType = mime.getType(documentRoot + urlPath);
				}
				if (mimeType === 'text/html') {
					encoding = 'utf8';
				}
				if (urlPath === '/config.js') {
					mimeType = 'text/javascript';
					ret = JSON.stringify({socket_url: config.socket_url});
					res.writeHead(200);
					res.end(ret);
				} else {
					ret = fs.readFileSync(documentRoot + urlPath, encoding);
					res.setHeader("Content-Type", mimeType);
					res.writeHead(200);
					res.end(ret);
				}
				LOG.msg(logPrefix, urlPath + ' ' + mimeType);
			} catch (e) {
				LOG.err(logPrefix, urlPath);
				res.writeHead(404);
				res.end()
			}
		});
	}
}

module.exports = Http;
