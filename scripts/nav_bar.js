import { $ } from "./utils.js";
const burgerBtn = $("#menu_btn");
const linksList = $(".links_list__list");
const liElements = linksList.querySelectorAll(".list__item");
const aElements = linksList.querySelectorAll(".list__item a");
const nav = $(".nav-bar");

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