import { $ } from "./utils.js";

const mainImgContainer = $(".img-container");

const image = new Image();
let load = 0;
const interval = setInterval(blurry, 20);
image.addEventListener("load", (_) => {
	mainImgContainer.insertAdjacentElement("afterbegin", image);
	image.setAttribute("decoding", "sync");
	image.setAttribute("loading", "eager");
});
image.src = "/assets/images/EXTERIOR_48 - Foto 2.jpg";
function blurry() {
	load++;
	if (load > 99) clearInterval(interval);
	image.style.opacity = scale(load, 0, 100, 1, 1);
	image.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}
function scale(current, in_min, in_max, out_min, out_max) {
	return (
		((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
	);
}
