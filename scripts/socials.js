import { $$ } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
	const socials = $$(".socials__container_list .icon");

	setTimeout(() => {
		for (const [idx, social] of socials.entries()) {
			social.style.animationName = "appear";
			social.style.animationDuration = ".8s";
			social.style.animationDelay = `${(idx + 0.2) / 10}s`;
		}
	}, 300);
});
