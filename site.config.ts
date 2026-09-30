import { defineSiteConfig } from './src/lib/config/schema';

/**
 * Silver Linings — site configuration.
 * Change palette, moods, taglines, hours, contact and section order here.
 * Content (menu, events, photos, shop items, social posts) lives in src/content/.
 */
export default defineSiteConfig({
	name: 'Silver Linings',
	shortName: 'Silver Linings',
	url: 'https://silverliningscafe.site',
	description:
		'A hand-crafted mud cafe in Bir, Himachal Pradesh. Specialty coffee, hand-made desserts and a sanctuary from the storm.',

	season: {
		mode: 'auto',
		rainMonths: [7, 8, 9],
		sunsetFromHour: 17
	},

	// Sampled from photos of the cafe (see PROJECT.md §9), lifted a notch for screens.
	palette: {
		clay: '#b08a5e',
		wood: '#5e3a2c',
		brick: '#a8362c',
		periwinkle: '#8d95c8',
		sky: '#dfe3ee',
		sunsetFrom: '#f0a35e',
		sunsetTo: '#c96d7a',
		silver: '#b7b9c3',
		table: '#7a4a38',
		log: '#6e5f4f',
		cream: '#f1e9dc',
		ink: '#2d2019',
		slate: '#2a2a2e',
		chalkPink: '#e9b7c3',
		chalkYellow: '#e6db8c',
		chalkGreen: '#bcc794'
	},

	// The three decisions we are testing by eye. Flip them live with the switcher.
	theme: {
		accent: 'brick', // brick | table | log
		surface: 'cream', // cream | ochre | hybrid
		greens: 'olive',
		greenSets: {
			olive: { moss: '#4d6a26', leaf: '#93a04a' }, // grass and shrubs in the photos
			emerald: { moss: '#3f5a3a', leaf: '#8cab5e' }, // the original guess
			sage: { moss: '#5f7358', leaf: '#a3b08f' } // desaturated, between the two
		},
		hero: {
			header: 'scrim', // scrim | frosted | hidden
			photo: 'natural', // natural | dark | tint
			text: 'left' // left | center | panel
		},
		board: 'slate', // slate | wood | none — the chalkboard strip and icon discs in the menu
		memory: 'strip', // strip | timeline — Memory Lane layout
		switcher: true
	},

	taglines: [
		'Every cloud hides a spark',
		'Silver lining in a cup',
		'Finding the silver lining one cup at a time',
		'Cup half full',
		'Storm passes, coffee stays',
		'A sanctuary of mud, moss and morning magic',
		'Earthy roots, bright brews',
		'Sunsets, seedlings and silver linings'
	],
	taglineIntervalSeconds: 5,
	heroImageIntervalSeconds: 9,

	sections: [
		{ id: 'hero' },
		{ id: 'menu', navLabel: 'Menu' },
		{ id: 'memory-lane', navLabel: 'Memory lane' },
		{ id: 'social', navLabel: 'Moments' },
		{ id: 'shop', navLabel: 'Made in Bir' },
		{ id: 'events', navLabel: 'Events' },
		{ id: 'find-us', navLabel: 'Find us' }
	],

	// Menu presentation. The items themselves are in src/content/menu.ts.
	menu: {
		currency: '₹',
		showPrices: true,
		featured: [
			'bakes/banoffee-dreams',
			'eggs/shakshouka',
			'bakes/blueberry-cheesecake',
			'pancakes/nutella',
			'coffee/cappuccino',
			'bakes/walnut-brownie'
		],
		filters: ['veg', 'vegan', 'egg'],
		tileIntervalSeconds: 5,
		footnote:
			'Everything is vegetarian. Prices in rupees, taxes included. Ask us about what the garden gave today.'
	},

	hours: {
		open: '09:00',
		close: '19:00',
		closedDays: [3],
		note: 'Closed on Wednesdays'
	},

	contact: {
		phone: '+91 83509 74903',
		whatsapp: '918350974903',
		instagram: 'https://www.instagram.com/silver_linings_bir/',
		address: {
			lines: ['Bir Colony Road', 'Suja, Himachal Pradesh 176077'],
			landmark: 'Near the paragliding landing site',
			mapsUrl: 'https://maps.google.com/?q=Silver+Linings+Cafe+Bir'
		}
	},

	calm: false
});
