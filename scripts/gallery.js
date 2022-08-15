import { $, $$ } from "./utils.js";
import gallery_json from "./images.json" assert { type: "json" };
let lastImageObserved = 0;
let imagesPerRequest = 5;

const gallery = $(".gallery-container");

const observerOptions = {
	root: null,
	rootMargin: "-20px",
};

function intersectingCallback(entries) {
	for (const [idx, entry] of entries.entries()) {
		entry.target.addEventListener("transitionend", ({ target }) => {
			target.style.transitionDelay = "0s";
		});
		entry.target.style.transitionDelay = `${(idx + 1) / 10}s`;
		entry.target.classList.toggle("show", entry.isIntersecting);
	}
}

const intersectionObserver = new IntersectionObserver(
	intersectingCallback,
	observerOptions
);

const lastImageObserver = new IntersectionObserver(
	([entry]) => {
		if (!entry.isIntersecting) return;
		lastImageObserver.unobserve(entry.target);
		setTimeout(() => {
			if (gallery_json.images.data.length !== lastImageObserved) loadNewCards();
			if (lastImageObserved !== gallery_json.images.data.length - 1) {
				lastImageObserver.observe($(".img-container:last-child"));
			}
		}, 400);
	},
	{
		rootMargin: "-100px",
	}
);

const cards = $$(".img-container");

const normalizeImageURL = ({ dir, name, ext }) => dir + name + "." + ext;

function loadNewCards() {
	const { images, ext, abs_dir } = gallery_json;
	const nodes = [];
	for (let i = 0; i < imagesPerRequest; i++) {
		if (lastImageObserved >= gallery_json.images.data.length - 1) break;
		const newCard = document.createElement("article");
		newCard.setAttribute("class", "img-container");
		const newImage = new Image();
		newImage.loading = "lazy";
		newImage.decoding = "async";
		newImage.addEventListener("load", (e) => {
			e.target.classList.add("loaded");
			gallery.classList.add("show");
		});
		newImage.src = images.data[lastImageObserved].dir;
		newCard.appendChild(newImage);
		intersectionObserver.observe(newCard);
		nodes.push(newCard);
		lastImageObserved++;
	}
	gallery.append(...nodes);
}

if (cards.length === 0) {
	loadNewCards();
	const lastCard = $(".img-container:last-child");
	lastImageObserver.observe(lastCard);
	for (const card of cards) {
		intersectionObserver.observe(card);
	}
}
