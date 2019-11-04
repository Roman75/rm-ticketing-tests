import page from "page";
//import _ from 'lodash';

/**
 * Router for URL requests
 * <div>Here are all possible URLs listed (like rest endpoints in middleware)</div>
 * <div>Every possible request must be implemented here</div>
 */
class Router {
	constructor(client) {

		page.base('');

		page('/', (res) => {
			console.log('0 ============');
			console.log('root', res);
		});
		page('/about', (res) => {
			console.log('1 ============');
			console.log('about', res);
		});
		page('/contact', (res) => {
			console.log('3 ============');
			console.log('contact', res);
		});
		page('/contact/:contactName', (res) => {
			console.log('4 ============');
			console.log('contact with param?', res);
		});
		page('/site/:param1/:param2', (res) => {
			console.log('5 ============');
			console.log('site with param?', res);
		});
		page('/site2/:param1/:param2', (res) => {
			console.log('6 ============');
			console.log('site2 with param?', res);
		});
		page('/event/fetch', (res) => {
			console.log('7 ============');
			console.log('/event/fetch', res);
			document.SOCKET.emit('event-fetch-all');
		});
		page('/event/fetch/:EventID', (res) => {
			console.log('8 ============');
			console.log('/event/fetch/:EventID', res);
			document.SOCKET.emit('event-fetch', res.params.EventID);
		});

		page();
	}
}

module.exports = Router;
