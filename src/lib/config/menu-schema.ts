import { z } from 'zod';

/**
 * Schema for the menu in src/content/menu.ts. Validated at build time so a
 * typo, a duplicate id or a bad price fails the build rather than the page.
 *
 * Shape, in short:
 *   group     Food | Drinks | Bakes — the three boards; tabs on the menu page
 *   category  Eggs, Pancakes, Smoothies … — one Rive/SVG icon each
 *   item      one line on the board; optional subgroup ("Non-dairy"),
 *             ingredients, add-ons, tags and photo
 */

export const menuGroupSchema = z.enum(['food', 'drinks', 'bakes']);
export type MenuGroup = z.infer<typeof menuGroupSchema>;

/** Dietary and marketing tags. Category-level tags apply to every item in it. */
export const menuTagSchema = z.enum([
	'veg',
	'vegan',
	'egg',
	'spicy',
	'signature',
	'new',
	'seasonal'
]);
export type MenuTag = z.infer<typeof menuTagSchema>;

const rupees = z.number().int().nonnegative();

/** A price is a number, a "from" price, or named variants (Shakes: banana 200 / mango 150). */
export const priceSchema = z.union([
	rupees,
	z.object({ from: rupees }),
	z.array(z.object({ label: z.string().min(1), price: rupees })).min(1)
]);
export type Price = z.infer<typeof priceSchema>;

export const addOnSchema = z.object({
	name: z.string().min(1),
	price: rupees
});
export type AddOn = z.infer<typeof addOnSchema>;

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'expected a kebab-case id');

export const menuItemSchema = z.object({
	/** Stable id for featuring/linking. Defaults to a slug of the name. */
	id: slug.optional(),
	name: z.string().min(1),
	description: z.string().optional(),
	/** Shown as "pineapple · ginger · coconut"; smoothies are named by these. */
	ingredients: z.array(z.string().min(1)).optional(),
	/** Omit while a price is unknown; the row then shows no price. */
	price: priceSchema.optional(),
	/** "Add fruit +70". Merged with the category's add-ons. */
	addOns: z.array(addOnSchema).optional(),
	tags: z.array(menuTagSchema).default([]),
	/** Set false to hide without deleting (off-season pies). */
	available: z.boolean().default(true),
	/** Overrides the category icon for a single item. */
	icon: z.string().optional(),
	/** Optional heading this item sits under inside the category ("Non-dairy"). */
	subgroup: z.string().optional(),
	/** File inside src/lib/assets/photos/menu/ plus alt text. */
	image: z.object({ file: z.string().min(1), alt: z.string().min(1) }).optional()
});
export type MenuItemInput = z.input<typeof menuItemSchema>;

export const menuCategorySchema = z.object({
	id: slug,
	title: z.string().min(1),
	group: menuGroupSchema,
	/** Icon key resolved by CategoryIcon.svelte. */
	icon: z.string().min(1),
	/** One line under the title. */
	blurb: z.string().optional(),
	/** Small print at the end: "Sides at ₹70: veggies, potatoes …". */
	note: z.string().optional(),
	/** Applied to every item in the category (Eggs → ['egg']). */
	tags: z.array(menuTagSchema).default([]),
	/** Add-ons offered on every item in the category. */
	addOns: z.array(addOnSchema).optional(),
	items: z.array(menuItemSchema).min(1)
});
export type MenuCategoryInput = z.input<typeof menuCategorySchema>;

export const menuSchema = z
	.array(menuCategorySchema)
	.min(1)
	.refine((cats) => new Set(cats.map((c) => c.id)).size === cats.length, 'duplicate category id');

/* ---------- resolved shapes the UI consumes ---------- */

export interface MenuItem {
	id: string;
	name: string;
	description?: string;
	ingredients?: string[];
	price?: Price;
	addOns: AddOn[];
	tags: MenuTag[];
	available: boolean;
	icon?: string;
	subgroup?: string;
	image?: { file: string; alt: string };
	/** Owning category id, handy when items are shown out of context (featured). */
	categoryId: string;
	group: MenuGroup;
}

export interface MenuCategory {
	id: string;
	title: string;
	group: MenuGroup;
	icon: string;
	blurb?: string;
	note?: string;
	items: MenuItem[];
}

export function slugify(s: string): string {
	return s
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/**
 * Validate and resolve the menu: fills ids, merges category tags and add-ons
 * into items, and checks item ids are unique within their category.
 */
export function defineMenu(input: MenuCategoryInput[]): MenuCategory[] {
	const parsed = menuSchema.safeParse(input);
	if (!parsed.success) {
		throw new Error('src/content/menu.ts is invalid:\n' + z.prettifyError(parsed.error));
	}
	return parsed.data.map((cat) => {
		const seen = new Set<string>();
		const items: MenuItem[] = cat.items.map((it) => {
			const id = it.id ?? slugify(it.name);
			if (seen.has(id)) {
				throw new Error(`src/content/menu.ts: duplicate item id "${id}" in category "${cat.id}"`);
			}
			seen.add(id);
			return {
				...it,
				id,
				tags: [...new Set([...cat.tags, ...it.tags])],
				addOns: [...(cat.addOns ?? []), ...(it.addOns ?? [])],
				categoryId: cat.id,
				group: cat.group
			};
		});
		return {
			id: cat.id,
			title: cat.title,
			group: cat.group,
			icon: cat.icon,
			blurb: cat.blurb,
			note: cat.note,
			items
		};
	});
}
