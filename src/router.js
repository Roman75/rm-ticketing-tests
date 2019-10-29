import page from "page";

class Router {
	constructor(client) {

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

		page();

	}
}

module.exports = Router;
