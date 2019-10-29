import readingTime from "reading-time";
import Router from './router';

console.log('WE ARE HERE!');

window.calcRT = ev => {
	let stats = readingTime(ev.value).text;
	document.getElementById("readingTime").innerText = stats;
};

new Router();
