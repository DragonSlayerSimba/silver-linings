/**
 * Section photos under src/lib/assets/photos/<section>/, processed by
 * enhanced-img at build. Content files name a photo by `{ file, alt }`;
 * components resolve it here. The hero and menu keep their own globs
 * because they need different widths.
 */
const pictures = import.meta.glob('/src/lib/assets/photos/{memory,events,social,shop}/*.jpg', {
	eager: true,
	import: 'default',
	query: { enhanced: true, w: '480;960;1440' }
}) as Record<string, string>;

export type Section = 'memory' | 'events' | 'social' | 'shop';

export function photo(section: Section, file: string | undefined): string | undefined {
	return file ? pictures[`/src/lib/assets/photos/${section}/${file}`] : undefined;
}
