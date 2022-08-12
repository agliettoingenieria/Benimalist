const burgerBtn = $("#menu_btn");
const linksList = $(".links_list__list");
const themeBtn = $("#theme_btn");

burgerBtn.addEventListener("click", (e) => {
	linksList.classList.toggle("show");
});

themeBtn.addEventListener("click", (e) => {
	const bodyElement = document.body;
	if (bodyElement.getAttribute("class") === "bg-light") {
		bodyElement.classList.replace("bg-light", "bg-dark");
	} else {
		bodyElement.classList.replace("bg-dark", "bg-light");
	}
});
