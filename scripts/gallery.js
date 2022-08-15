import { $, $$ } from "./utils.js";
import gallery_json from "./images.json" assert { type: "json" };
let lastImageObserved = 0;
const gallery = $(".gallery-container");

const observerOptions = {
	root: null,
	rootMargin: "-20px",
};

function intersectingCallback(entries) {
	for (const entry of entries) {
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
		if (gallery_json.images.data.length !== lastImageObserved) loadNewCards();
		console.log("oberving again");
		lastImageObserver.observe($(".img-container:last-child"));
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
	for (let i = lastImageObserved; i < images.data.length - 1; i++) {
		const newCard = document.createElement("article");
		newCard.setAttribute("class", "img-container");
		const newImage = new Image();
		newImage.src = images.data[i].dir;
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
	console.log(lastCard);
	lastImageObserver.observe(lastCard);
	for (const card of cards) {
		intersectionObserver.observe(card);
	}
}
