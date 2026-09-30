import type { HeroImage } from './types';

// Placeholder photos from 2026-09-08 (overcast). Swap for golden-hour shots when we have them.
// Order is display order; the hero crossfades through them.
export const heroImages: HeroImage[] = [
	{
		file: '02-gate.jpg',
		alt: 'Wooden gate with the hand-painted Silver Linings sign',
		position: '50% 30%'
	},
	{
		file: '01-garden.jpg',
		alt: 'Stone path through the garden to the mud cafe',
		position: '50% 55%'
	},
	{
		file: '03-terrace.jpg',
		alt: 'Terrace benches against the ochre mud wall',
		position: '50% 50%'
	},
	{ file: '04-interior.jpg', alt: 'Cane chairs and a window onto the garden', position: '50% 50%' },
	{ file: '05-counter.jpg', alt: 'The dessert counter under the slate roof', position: '50% 50%' }
];
