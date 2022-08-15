import { $, $$ } from "./utils.js";

const gallery = $(".gallery-container");

const observerOptions = {
	root: null,
	rootMargin: "-80px",
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
		loadNewCards();
		lastImageObserver.observe($(".img-container:last-child"));
	},
	{
		rootMargin: "-100px",
	}
);

const cards = $$(".img-container");
const lastCard = $(".img-container:last-child");

lastImageObserver.observe(lastCard);

for (const card of cards) {
	intersectionObserver.observe(card);
}

function loadNewCards() {
	const nodes = [];
	for (let i = 0; i < 10; i++) {
		const newCard = document.createElement("article");
		newCard.setAttribute("class", "img-container");
		const newImage = new Image();
		newImage.src = "/assets/images/EXTERIOR_48 - Foto 2.jpg";
		newCard.appendChild(newImage);
		intersectionObserver.observe(newCard);
		nodes.push(newCard);
	}
	gallery.append(...nodes);
}
