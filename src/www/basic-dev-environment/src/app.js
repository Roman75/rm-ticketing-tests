import readingTime from "reading-time";
import page from "page";

window.calcRT = ev => {
	let stats = readingTime(ev.value).text;
	document.getElementById("readingTime").innerText = stats;
};

window.setTimeout(() => {

	console.log("ready!");

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
	page();

}, 1000);
