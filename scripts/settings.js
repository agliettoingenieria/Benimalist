const localStorage = JSON.parse(window.localStorage.getItem("settings")) || {
	theme: "bg-dark",
};
document.body.classList.add(localStorage.theme);
