export const $ = (element) => document.querySelector(element);
export const $$ = (element) => document.querySelectorAll(element);
export const timeout = (cb, ms) => setTimeout(cb, ms);
export const Observer = (element, cb, options) => {
	const intersectionObserver = new IntersectionObserver(cb, options);
	return {
		observe: (el) => intersectionObserver.observe(element ?? el),
		unobserve: (el) => intersectionObserver.unobserve(element ?? el),
	};
};
