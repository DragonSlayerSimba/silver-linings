/**
 * Sunset photos for the mood trial (Theme lab → Sunset / Sky). Each entry
 * names a file in src/lib/assets/photos/mood/ and where to anchor the crop.
 */
const pictures = import.meta.glob('/src/lib/assets/photos/mood/*.jpg', {
	eager: true,
	import: 'default',
	query: { enhanced: true }
}) as Record<string, string>;

export const skies = {
	drone: {
		file: 'sunset-drone.jpg',
		position: '30% 40%',
		alt: 'Drone view of a sunset: fiery clouds on one side, a storm cloud edged in silver on the other'
	},
	meadow: {
		file: 'sunset-meadow.jpg',
		position: '50% 50%',
		alt: 'The sun setting over green fields, mountains to the right'
	},
	ember: {
		file: 'sunset-ember.jpg',
		position: '50% 70%',
		alt: 'A heavy dark cloud over a glowing orange band of sunset above the hills'
	}
} as const;

export type Sky = keyof typeof skies;

export function skyPhoto(name: Sky) {
	const s = skies[name];
	return { ...s, src: pictures[`/src/lib/assets/photos/mood/${s.file}`] };
}
