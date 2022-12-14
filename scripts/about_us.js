import { $, $$ } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
	const video = $(".video");
	const decorators = $$("[data-desc-decorator]");
	const descriptions = $$(".about_us__description > p");

	for (const decorator of decorators) {
		decorator.style.opacity = 1;
	}
	setTimeout(() => {
		for (const description of descriptions) {
			description.style.opacity = 1;
			description.style.left = "12px";
		}
	});

	const intersectionObserver = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				video.innerHTML = `
				<iframe width="560" height="315" src="https://www.youtube.com/embed/Wd6h2hbNfGk" 
				title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
				clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
				</iframe>
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
