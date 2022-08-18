import { $ } from "./utils.js";
const burgerBtn = $("#menu_btn");
const linksList = $(".links_list__list");
const liElements = linksList.querySelectorAll(".list__item");
const aElements = linksList.querySelectorAll(".list__item a");
const themeBtn = $("#theme_btn");
const nav = $(".nav-bar");

if (document.body.getAttribute("class") === "bg-dark") {
	themeBtn.firstElementChild.style.display = "none";
	themeBtn.lastElementChild.style.display = "inline-block";
} else {
	themeBtn.firstElementChild.style.display = "inline-block";
	themeBtn.lastElementChild.style.display = "none";
}

document.addEventListener("DOMContentLoaded", (_) => {
	nav.style.opacity = 1;
	const currentPath = window.location.pathname;
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
	if (!bodyElement.getAttribute("class")) {
		bodyElement.classList.add("bg-dark");
		return;
	}
	let bodyTheme = bodyElement.getAttribute("class");
	if (bodyElement.getAttribute("class") === "bg-light") {
		bodyElement.classList.replace("bg-light", "bg-dark");
		bodyTheme = "bg-dark";
		themeBtn.firstElementChild.style.display = "none";
		themeBtn.lastElementChild.style.display = "inline-block";
	} else if (bodyElement.getAttribute("class") === "bg-dark") {
		bodyElement.classList.replace("bg-dark", "bg-light");
		bodyTheme = "bg-light";
		themeBtn.firstElementChild.style.display = "inline-block";
		themeBtn.lastElementChild.style.display = "none";
	}
	window.localStorage.setItem("settings", JSON.stringify({ theme: bodyTheme }));
});
