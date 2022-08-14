import { $, $$ } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
	const video = $(".video");
	const decorators = $$("[data-desc-decorator]");
	const descriptions = $$(".about_us__description > p");

	video.innerHTML = `
	<iframe src="https://www.youtube.com/embed/8mHNYJVrp8Q" title="YouTube video player" frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen></iframe>
	`;
	for (const decorator of decorators) {
		decorator.style.opacity = 1;
	}
	setTimeout(() => {
		for (const description of descriptions) {
			description.style.opacity = 1;
			description.style.left = "12px";
		}
	}, 100);
});
