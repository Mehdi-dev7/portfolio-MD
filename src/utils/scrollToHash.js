/** Scroll fluide vers l’élément dont l’id correspond au hash (ex. "#contact"). */
export function scrollToHash(href) {
	const id = href.replace(/^#/, "");
	const el = document.getElementById(id);
	if (el) {
		el.scrollIntoView({ behavior: "smooth", block: "start" });
		window.history.replaceState(null, "", href);
	}
}
