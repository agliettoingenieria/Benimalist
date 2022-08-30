import { $, $$, Observer } from "./utils.js";
import gallery_json from "./images.js";

window.addEventListener("load", (e) => {
	const gallery = $(".gallery-container");
	const growImage = $(".grow-image-container");
	const closeImageBtn = $("#close-image");
	const imgSized = $(".img-sized");

	let lastImageObserved = 0;
	let imagesPerRequest = 2;

	let galleryObserver, lastCardObserver;

	closeImageBtn.addEventListener("click", () => {
		growImage.classList.toggle("show");
	});

	function galleryObserverCallback(entries) {
		for (const [idx, entry] of entries.entries()) {
			entry.target.classList.toggle("show", entry.isIntersecting);
		}
	}

	function lastCardObserverCallback([entry]) {
		if (!entry.isIntersecting) return;
		lastCardObserver.unobserve(entry.target);
		if (gallery_json.images.data.length !== lastImageObserved) loadNewCards();
		lastCardObserver.observe($("img-container:last-child"));
	}

	function loadNewCards() {
		const { images } = gallery_json;
		const nodes = [];
		for (let i = 0; i < imagesPerRequest; i++) {
			if (lastImageObserved >= gallery_json.images.data.length - 1) break;
			const newCard = document.createElement("article");
			newCard.setAttribute("class", "img-container");
			const newImage = new Image();
			newImage.addEventListener("click", (ev) => {
				const src = ev.target.getAttribute("src");
				imgSized.setAttribute("src", src);
				growImage.classList.toggle("show");
			});
			newImage.loading = "lazy";
			newImage.decoding = "async";
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
		rootMargin: "0px",
		threshold: 0.45,
	};

	galleryObserver = Observer(null, galleryObserverCallback, observerOptions);
	loadNewCards();
	const lastCard = $(".img-container:last-child");
	lastCardObserver = Observer(
		lastCard, // Root
		lastCardObserverCallback, // Callback
		observerOptions // Options
	);
	lastCardObserver.observe();
	for (const card of cards) {
		galleryObserver.observe(card);
	}
});
