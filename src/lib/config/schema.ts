import { z } from 'zod';
import { menuGroupSchema, menuTagSchema } from './menu-schema';

/**
 * Schema for site.config.ts. Everything the site needs to know that is not
 * content (menu items, events, photos) lives here and is validated at build
 * time so a typo fails the build instead of the page.
 */

export const seasonSchema = z.enum(['golden-hour', 'night', 'snow']);
export type Season = z.infer<typeof seasonSchema>;

export const sectionIdSchema = z.enum([
	'hero',
	'menu',
	'memory-lane',
	'social',
	'shop',
	'events',
	'find-us'
]);
export type SectionId = z.infer<typeof sectionIdSchema>;

const hexColour = z
	.string()
	.regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, 'expected a hex colour like #c2643f');

export const paletteSchema = z.object({
	/** mud wall */
	clay: hexColour,
	/** counter, tables */
	wood: hexColour,
	/** hand-painted signboard red */
	brick: hexColour,
	/** window and door frames */
	periwinkle: hexColour,
	/** overcast sky */
	sky: hexColour,
	sunsetFrom: hexColour,
	sunsetTo: hexColour,
	/** slate roof: the "lining". Decorative; weak contrast on cream. */
	silver: hexColour,
	/** tabletops: mid red-brown, lifted for text use */
	table: hexColour,
	/** gate posts and beams: weathered grey-brown pine */
	log: hexColour,
	/** plaster / paper */
	cream: hexColour,
	/** text */
	ink: hexColour,
	/** the chalkboards: near-black slate */
	slate: hexColour,
	/** chalk lettering on the boards */
	chalkPink: hexColour,
	chalkYellow: hexColour,
	chalkGreen: hexColour
});
export type Palette = z.infer<typeof paletteSchema>;

export const greenSetSchema = z.object({ moss: hexColour, leaf: hexColour });
export type GreenSet = z.infer<typeof greenSetSchema>;

export const accentSchema = z.enum(['brick', 'table', 'log']);

/** Hero treatments under test. */
export const heroHeaderSchema = z.enum(['scrim', 'frosted', 'hidden']);
export const heroPhotoSchema = z.enum(['natural', 'dark', 'tint']);
export const heroTextSchema = z.enum(['left', 'center', 'panel']);
export type HeroHeader = z.infer<typeof heroHeaderSchema>;
export type HeroPhoto = z.infer<typeof heroPhotoSchema>;
export type HeroText = z.infer<typeof heroTextSchema>;
export const heroLabSchema = z.object({
	/** scrim: dark top gradient + light nav over the hero, cream bar after. frosted: blurred pill always. hidden: nav appears only after scrolling past the hero. */
	header: heroHeaderSchema.default('scrim'),
	/** natural: photo untouched, bottom fade into the page. dark: bottom darkening + light text. tint: light page-colour wash over the photo. */
	photo: heroPhotoSchema.default('natural'),
	/** left: bottom-left block. center: centred under the roof line. panel: text on a solid panel bleeding off the left edge. */
	text: heroTextSchema.default('left')
});
export const surfaceSchema = z.enum(['cream', 'ochre', 'hybrid']);
/** The chalkboard treatment on the menu: slate (literal), wood (counter brown), none (chips on the surface). */
export const boardSchema = z.enum(['slate', 'wood', 'none']);
export type Board = z.infer<typeof boardSchema>;
/** Memory Lane layout: a vertical timeline, or a horizontal strip of polaroids. */
export const memoryLayoutSchema = z.enum(['strip', 'timeline']);
export type MemoryLayout = z.infer<typeof memoryLayoutSchema>;

/** Trial: the drone sunset photo as the page background in sunset mood, or as a full-width band. */
export const sunsetPhotoSchema = z.enum(['off', 'page', 'band']);
export type SunsetPhoto = z.infer<typeof sunsetPhotoSchema>;
/** Which photo the sunset trial uses (files listed in src/lib/mood-photos.ts). */
export const skySchema = z.enum(['drone', 'meadow', 'ember']);
export type SkyName = z.infer<typeof skySchema>;
export type Accent = z.infer<typeof accentSchema>;
export type Surface = z.infer<typeof surfaceSchema>;

/**
 * Theme decisions we are testing by eye. Each axis is independent; the
 * defaults here are what the site ships with, the switcher overrides them
 * at runtime while `switcher` is true.
 */
export const themeSchema = z
	.object({
		accent: accentSchema.default('brick'),
		surface: surfaceSchema.default('cream'),
		greens: z.string().default('olive'),
		greenSets: z.record(z.string(), greenSetSchema),
		hero: heroLabSchema.default({ header: 'scrim', photo: 'natural', text: 'left' }),
		board: boardSchema.default('slate'),
		memory: memoryLayoutSchema.default('strip'),
		sunsetPhoto: sunsetPhotoSchema.default('off'),
		sky: skySchema.default('drone'),
		/** Show the live theme switcher panel. Turn off before launch. */
		switcher: z.boolean().default(false)
	})
	.refine((t) => t.greens in t.greenSets, {
		message: 'theme.greens must name a key of theme.greenSets'
	});
export type ThemeConfig = z.output<typeof themeSchema>;

const timeHHMM = z.string().regex(/^\d{2}:\d{2}$/, 'expected HH:MM');

export const siteConfigSchema = z.object({
	name: z.string().min(1),
	shortName: z.string().min(1),
	url: z.url(),
	description: z.string().min(1),
	locale: z.string().default('en-IN'),

	/**
	 * Ambient background mood. 'auto' picks by month and hour on the visitor's clock
	 * (night, then snow months, else golden hour); a mood name forces that one.
	 */
	season: z.object({
		mode: z.union([z.literal('auto'), seasonSchema]).default('golden-hour'),
		/** Months (1–12) treated as snow season when mode is 'auto'. */
		snowMonths: z.array(z.number().int().min(1).max(12)).default([12, 1, 2]),
		/** Hour (0–23) from which 'auto' switches to night; night lasts until 5am. */
		nightFromHour: z.number().int().min(0).max(23).default(19)
	}),

	palette: paletteSchema,
	theme: themeSchema,

	/** Rotated in the hero; sprinkled elsewhere. */
	taglines: z.array(z.string().min(1)).min(1),
	/** Seconds each tagline stays on screen in the hero. */
	taglineIntervalSeconds: z.number().positive().default(5),
	/** Seconds each hero photo stays before crossfading to the next. */
	heroImageIntervalSeconds: z.number().positive().default(9),

	/** Order here is render order. Set enabled: false to hide a section without deleting it. */
	sections: z
		.array(
			z.object({
				id: sectionIdSchema,
				enabled: z.boolean().default(true),
				/** Nav label; omit to keep the section out of the header nav. */
				navLabel: z.string().optional(),
				/**
				 * Icon for the phone header. Only sections with one appear there;
				 * the rest are reached by scrolling. Keep it to three or four.
				 */
				phoneIcon: z.enum(['cup', 'calendar', 'pin', 'bag', 'camera', 'clock']).optional()
			})
		)
		.min(1)
		.refine((s) => new Set(s.map((x) => x.id)).size === s.length, 'duplicate section id'),

	/** How the menu is presented. Items and prices live in src/content/menu.ts. */
	menu: z.object({
		currency: z.string().default('₹'),
		/** Hide every price (e.g. while they are unverified) without touching the content. */
		showPrices: z.boolean().default(true),
		/** ISO date shown as small print under the menu; omit to show nothing. */
		lastVerified: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD')
			.optional(),
		/** Tab order and labels on the menu page. */
		groups: z
			.array(z.object({ id: menuGroupSchema, label: z.string().min(1) }))
			.min(1)
			.default([
				{ id: 'food', label: 'Food' },
				{ id: 'drinks', label: 'Drinks' },
				{ id: 'bakes', label: 'Bakes' }
			]),
		/** Tags offered as filter chips, in order. Empty hides the filter row. */
		filters: z.array(menuTagSchema).default(['veg', 'vegan', 'egg']),
		/** "category/item" ids shown on the home-page teaser. Missing ids are ignored. */
		featured: z.array(z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/)).default([]),
		/** Small print at the foot of the menu. */
		footnote: z.string().optional(),
		/** Seconds each photo stays in the counter tile on the home page before crossfading. */
		tileIntervalSeconds: z.number().positive().default(5)
	}),

	hours: z.object({
		open: timeHHMM,
		close: timeHHMM,
		/** 0 = Sunday … 6 = Saturday */
		closedDays: z.array(z.number().int().min(0).max(6)).default([]),
		note: z.string().optional()
	}),

	contact: z.object({
		phone: z.string().min(1),
		whatsapp: z.string().optional(),
		email: z.email().optional(),
		instagram: z.string().optional(),
		address: z.object({
			lines: z.array(z.string().min(1)).min(1),
			landmark: z.string().optional(),
			mapsUrl: z.url().optional(),
			lat: z.number().optional(),
			lng: z.number().optional()
		})
	}),

	/** Reduce ambient motion for everyone, not just users with prefers-reduced-motion. */
	calm: z.boolean().default(false)
});

export type SiteConfigInput = z.input<typeof siteConfigSchema>;
export type SiteConfig = z.output<typeof siteConfigSchema>;

export function defineSiteConfig(input: SiteConfigInput): SiteConfig {
	const result = siteConfigSchema.safeParse(input);
	if (!result.success) {
		throw new Error('site.config.ts is invalid:\n' + z.prettifyError(result.error));
	}
	return result.data;
}
