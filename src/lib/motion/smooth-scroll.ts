import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Smooth scrolling (Lenis) driven by GSAP's ticker, with ScrollTrigger kept in
 * sync. Call from onMount; returns a cleanup function. No-op when the visitor
 * prefers reduced motion.
 */
export function startSmoothScroll(): () => void {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

	gsap.registerPlugin(ScrollTrigger);
	const lenis = new Lenis({ lerp: 0.1, anchors: true });
	lenis.on('scroll', ScrollTrigger.update);
	const tick = (time: number) => lenis.raf(time * 1000);
	gsap.ticker.add(tick);
	gsap.ticker.lagSmoothing(0);

	return () => {
		gsap.ticker.remove(tick);
		lenis.destroy();
	};
}
