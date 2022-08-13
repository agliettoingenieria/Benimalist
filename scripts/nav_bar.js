import { $ } from "./utils.js";
const burgerBtn = $("#menu_btn");
const linksList = $(".links_list__list");
const liElements = linksList.querySelectorAll(".list__item");
const aElements = linksList.querySelectorAll(".list__item a");
const themeBtn = $("#theme_btn");
const nav = $(".nav-bar");

if (JSON.parse(window.localStorage.getItem("settings")).theme === "bg-dark") {
	themeBtn.children[0].setAttribute("src", "/assets/icons/Moon_Icon.svg");
} else {
	themeBtn.children[0].setAttribute("src", "/assets/icons/Sun_Icon.svg");
}

document.addEventListener("DOMContentLoaded", (_) => {
	nav.style.opacity = 1;
	const currentPath = window.location.pathname;
	console.log(currentPath);
	console.log();
	aElements.forEach((el, idx) => {
		if (el.getAttribute("href") === currentPath) {
			liElements[idx].style.backgroundColor = "#1c3483db";
			liElements[idx].style.borderRadius = ".375rem";
		}
	});
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
