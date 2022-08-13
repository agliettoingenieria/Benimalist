import { $ } from "./utils.js";
const burgerBtn = $("#menu_btn");
const linksList = $(".links_list__list");
const themeBtn = $("#theme_btn");
const nav = $(".nav-bar");

document.addEventListener("DOMContentLoaded", (_) => {
	nav.style.opacity = 1;
});

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
