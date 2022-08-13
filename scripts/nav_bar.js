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
	if (!bodyElement.getAttribute("class")) {
		bodyElement.classList.add("bg-dark");
		return;
	}
	let bodyTheme = bodyElement.getAttribute("class");
	if (bodyElement.getAttribute("class") === "bg-light") {
		bodyElement.classList.replace("bg-light", "bg-dark");
		bodyTheme = "bg-dark";
		themeBtnImg.setAttribute("src", "/assets/icons/Moon_Icon.svg");
	} else if (bodyElement.getAttribute("class") === "bg-dark") {
		bodyElement.classList.replace("bg-dark", "bg-light");
		bodyTheme = "bg-light";
		themeBtnImg.setAttribute("src", "/assets/icons/Sun_Icon.svg");
	}
	window.localStorage.setItem("settings", JSON.stringify({ theme: bodyTheme }));
});
