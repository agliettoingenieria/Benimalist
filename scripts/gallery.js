import { $, Observer, timeout } from "./utils.js";
import gallery_json from "./images.json" assert { type: "json" };
let lastImageObserved = 0;
let imagesPerRequest = 4;
let lastCardObserver;
const gallery = $(".gallery-container");

window.addEventListener("load", main);

function main() {
	function lastCardObserverCallback([entry]) {
		if (!entry.isIntersecting) return;
		lastCardObserver.unobserve(entry.target);
		timeout(() => {
			if (gallery_json.images.data.length !== lastImageObserved) loadNewCards();
			if (lastImageObserved !== gallery_json.images.data.length - 1) {
				lastCardObserver.observe($(".img-container:last-child"));
			}
		}, 800);
	}

	function loadNewCards() {
		const { images } = gallery_json;
		const nodes = [];
		for (let i = 0; i < imagesPerRequest; i++) {
			if (lastImageObserved >= images.data.length - 1) break;
			const newCard = document.createElement("article");
			newCard.setAttribute("class", "img-container");
			const dir = images.data[lastImageObserved].dir;

			const newImage = setImageProperies(dir, () => {
				newCard.classList.add("show");
			});

			newCard.appendChild(newImage);
			nodes.push(newCard);
			lastImageObserved++;
		}
		gallery.append(...nodes);
	}

	function setImageProperies(imageSrc, loadCb) {
		const newImage = new Image();
		newImage.loading = "lazy";
		newImage.decoding = "async";
		newImage.src = imageSrc;
		newImage.addEventListener("load", loadCb);
		return newImage;
	}

	const observerOptions = {
		rootMargin: "0px 0px -80px 0px",
		threshold: 0.5,
	};

	loadNewCards();
	const lastCard = $(".img-container:last-child");
	lastCardObserver = Observer(
		lastCard,
		lastCardObserverCallback,
		observerOptions
	);
	lastCardObserver.observe();
}
