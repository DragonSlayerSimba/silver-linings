import config from '$config';
import { menu } from '$content';
import type { MenuCategory, MenuItem, MenuTag } from '$lib/config/menu-schema';
import type { Board } from '$lib/config/schema';

/** Menu read through the presentation settings in site.config.ts. */

export interface MenuGroupView {
	id: MenuCategory['group'];
	label: string;
	categories: MenuCategory[];
}

/** Tabs in config order; a group with no categories is dropped. */
export const groups: MenuGroupView[] = config.menu.groups
	.map((g) => ({ ...g, categories: menu.filter((c) => c.group === g.id) }))
	.filter((g) => g.categories.length > 0);

export const categories: MenuCategory[] = groups.flatMap((g) => g.categories);

const byRef = new Map<string, MenuItem>();
for (const cat of menu) for (const it of cat.items) byRef.set(`${cat.id}/${it.id}`, it);

/** Items named in config.menu.featured, in that order. Unknown or unavailable refs are skipped. */
export const featured: MenuItem[] = config.menu.featured
	.map((ref) => byRef.get(ref))
	.filter((it): it is MenuItem => !!it && it.available);

// Photos in src/lib/assets/photos/menu/, processed by enhanced-img at build.
const pictures = import.meta.glob('/src/lib/assets/photos/menu/*.jpg', {
	eager: true,
	import: 'default',
	query: { enhanced: true, w: '540;768;1080;1366' }
}) as Record<string, string>;

/** Responsive picture for a file in the menu photo folder, or undefined if it is missing. */
export function pictureOf(file: string | undefined): string | undefined {
	return file ? pictures[`/src/lib/assets/photos/menu/${file}`] : undefined;
}

export function categoryOf(item: MenuItem): MenuCategory | undefined {
	return menu.find((c) => c.id === item.categoryId);
}

/** Items still shown when a filter chip is active. */
export function visibleItems(items: MenuItem[], tag: MenuTag | null): MenuItem[] {
	return items.filter((it) => it.available && (!tag || it.tags.includes(tag)));
}

export const tagLabel: Record<MenuTag, string> = {
	veg: 'Veg',
	vegan: 'Vegan',
	egg: 'Egg',
	spicy: 'Spicy',
	signature: 'House favourite',
	new: 'New',
	seasonal: 'Seasonal'
};

/** Chalk colour per group, cycling if there are more groups than colours. */
export const chalkFor = (index: number) =>
	(['text-chalk-pink', 'text-chalk-yellow', 'text-chalk-green'] as const)[index % 3];

/** Class sets for the chalkboard treatment chosen in the Theme lab (theme.board). */
export function boardClasses(board: Board) {
	const dark = board !== 'none';
	return {
		/** the board itself */
		panel: dark
			? [board === 'slate' ? 'bg-slate' : 'bg-wood', 'text-cream/85']
			: 'border border-ink/10 bg-cream/40 text-ink/80',
		/** group word (Food / Drinks / Bakes) — chalk on dark, accent on light */
		word: (i: number) => (dark ? chalkFor(i) : 'text-accent'),
		/** category chip */
		chip: dark
			? 'border-cream/25 text-cream/90 hover:border-cream/60 hover:bg-white/10'
			: 'border-ink/15 bg-cream/60 text-ink/80 hover:border-ink/40',
		/** icon disc next to a category or item */
		disc: dark
			? [board === 'slate' ? 'bg-slate' : 'bg-wood', 'text-chalk-yellow']
			: 'border border-ink/15 bg-cream/70 text-accent',
		/** selected tab on the full menu */
		tabOn: dark ? 'bg-white/10' : 'bg-accent text-cream',
		tabOff: dark ? 'opacity-60 hover:opacity-90' : 'text-ink/60 hover:text-ink'
	};
}
