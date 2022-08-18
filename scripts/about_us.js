import { $, $$ } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
	const video = $(".video");
	const socials = $$(".socials__container_list .icon");
	const decorators = $$("[data-desc-decorator]");
	const descriptions = $$(".about_us__description > p");

	for (const decorator of decorators) {
		decorator.style.opacity = 1;
	}
	console.log(socials);
	setTimeout(() => {
		for (const description of descriptions) {
			description.style.opacity = 1;
			description.style.left = "12px";
		}
		console.log(socials);
		for (const [idx, social] of socials.entries()) {
			social.style.animationName = "appear";
			social.style.animationDuration = ".8s";
			social.style.animationDelay = `${(idx + 0.2) / 10}s`;
		}
	}, 300);

	const intersectionObserver = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				video.innerHTML = `
		<iframe src="https://www.youtube.com/embed/8mHNYJVrp8Q" title="YouTube video player" frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen></iframe>
		`;
				intersectionObserver.unobserve(entry.target);
			}
		},
		{
			root: null,
			rootMargin: "80px",
			threshold: 0.7,
		}
	);

	intersectionObserver.observe(video);
});
