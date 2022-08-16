import { $, $$, Observer, timeout } from "./utils.js";
import gallery_json from "./images.json" assert { type: "json" };
let lastImageObserved = 0;
let imagesPerRequest = 5;

let galleryObserver, lastCardObserver;

const gallery = $(".gallery-container");

function galleryObserverCallback(entries) {
	for (const [idx, entry] of entries.entries()) {
		entry.target.addEventListener("transitionend", ({ target }) => {
			target.style.transitionDelay = "0s";
		});
		entry.target.style.transitionDelay = `${(idx + 1) / 10}s`;
		entry.target.classList.toggle("show", entry.isIntersecting);
	}
}

function lastCardObserverCallback([entry]) {
	if (!entry.isIntersecting) return;
	lastCardObserver.unobserve(entry.target);
	timeout(() => {
		if (gallery_json.images.data.length !== lastImageObserved) loadNewCards();
		if (lastImageObserved !== gallery_json.images.data.length - 1) {
			lastCardObserver.observe($(".img-container:last-child"));
		}
	}, 400);
}

function loadNewCards() {
	const { images } = gallery_json;
	const nodes = [];
	for (let i = 0; i < imagesPerRequest; i++) {
		if (lastImageObserved >= gallery_json.images.data.length - 1) break;
		const newCard = document.createElement("article");
		newCard.setAttribute("class", "img-container");
		const newImage = new Image();
		newImage.loading = "lazy";
		newImage.decoding = "async";
		newImage.addEventListener("load", (e) => {
			newCard.style.opacity = 1;
			newCard.style.left = 0;
		});
		newImage.src = images.data[lastImageObserved].dir;
		newCard.appendChild(newImage);
		galleryObserver.observe(newCard);
		nodes.push(newCard);
		lastImageObserved++;
	}
	gallery.append(...nodes);
}

const cards = $$(".img-container");
const observerOptions = {
	root: null,
	rootMargin: "-20px",
};

galleryObserver = Observer(null, galleryObserverCallback, observerOptions);
loadNewCards();
const lastCard = $(".img-container:last-child");
lastCardObserver = Observer(
	lastCard,
	lastCardObserverCallback,
	observerOptions
);
lastCardObserver.observe();
for (const card of cards) {
	galleryObserver.observe(card);
}
