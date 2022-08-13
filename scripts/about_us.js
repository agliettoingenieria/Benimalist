import { $ } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
	const video = $(".video");
	const decorator = $("[data-desc-decorator]");
	const description = $(".about_us__description > p");

	video.innerHTML = `
	<iframe src="https://www.youtube.com/embed/8mHNYJVrp8Q" title="YouTube video player" frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen></iframe>
	`;
	decorator.style.opacity = 1;
	setTimeout(() => {
		description.style.opacity = 1;
		description.style.left = "12px";
	}, 100);
});
