/**
 * Svelte action for "drawn on" line art. Measures every shape inside the node the
 * first time it scrolls into view (so shapes inside hidden tabs measure correctly
 * later) and reports visibility through the callback: `drawn` turns true once and
 * stays, `inView` follows the viewport so loops can pause off-screen. The CSS in
 * MenuArt.svelte does the animating.
 */
export function drawOn(node: HTMLElement, report: (drawn: boolean, inView: boolean) => void) {
	const shapes = node.querySelectorAll<SVGGeometryElement>(
		'path, circle, ellipse, line, polyline, polygon'
	);
	let measured = false;
	const measure = () => {
		shapes.forEach((s, i) => {
			const len = typeof s.getTotalLength === 'function' ? s.getTotalLength() : 0;
			s.style.setProperty('--len', String(len || 1));
			s.style.setProperty('--i', String(i));
		});
		measured = true;
	};
	const io = new IntersectionObserver(
		([e]) => {
			if (e.isIntersecting && !measured) measure();
			report(measured, e.isIntersecting);
		},
		{ threshold: 0.2 }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
}
