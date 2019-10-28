import readingTime from "reading-time";
import $ from "jquery";
import page from "page";

window.calcRT = ev => {
	let stats = readingTime(ev.value).text;
	document.getElementById("readingTime").innerText = stats;
};

$(document).ready(function() {
	console.log("ready!");

	page.base('/basic-dev-environment');

	page('/', (res) => {
		console.log('root', res);
	});
	page('/about', (res) => {
		console.log('about', res);
	});
	page('/contact', (res) => {
		console.log('contact', res);
	});
	page('/contact/:contactName', (res) => {
		console.log('contact with param?', res);
	});
	page();

});
