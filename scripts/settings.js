import { $ } from "./utils.js";
const localStorage = JSON.parse(window.localStorage.getItem("settings")) || {
	theme: "bg-dark",
};
function showTheme() {
	$("html").style.backgroundColor =
		localStorage.theme === "bg-dark" && "#1f1d1d";
	document.body.classList.add(localStorage.theme);
}
function showContent() {
	document.body.style.visibility = "visible";
	document.body.style.opacity = "1";
	$("html");
	$("html").removeAttribute("style");
}

showTheme();
window.addEventListener("DOMContentLoaded", (_) => {
	showContent();
});
