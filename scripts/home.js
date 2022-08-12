const mainImgContainer = $(".img-container");
const burgerBtn = $("#menu_btn");
const linksList = $(".links_list__list");
const themeBtn = $("#theme_btn");
const nav = $(".nav-bar");

window.addEventListener("DOMContentLoaded", (_) => {
	nav.style.opacity = 1;
});

const image = new Image();
let load = 0;
const interval = setInterval(blurry, 20);
image.addEventListener("load", (e) => {
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

burgerBtn.addEventListener("click", (e) => {
	linksList.classList.toggle("show");
});

themeBtn.addEventListener("click", (e) => {
	const bodyElement = document.body;
	const themeBtnImg = themeBtn.children[0];

	if (bodyElement.getAttribute("class") === "bg-light") {
		bodyElement.classList.replace("bg-light", "bg-dark");
		themeBtnImg.setAttribute("src", "/assets/icons/Moon_Icon.svg");
	} else {
		bodyElement.classList.replace("bg-dark", "bg-light");
		themeBtnImg.setAttribute("src", "/assets/icons/Sun_Icon.svg");
	}
});
