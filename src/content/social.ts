import type { SocialPost } from './types';

/**
 * "From the garden": moments people posted from the cafe, credited to whoever
 * posted them, plus the drone shot to open. Placeholders from the Instagram
 * export; each visitor photo needs the poster's OK before launch.
 */
const ig = (handle: string) => `https://www.instagram.com/${handle}/`;

export const socialPosts: SocialPost[] = [
	{
		platform: 'instagram',
		url: ig('silver_linings_bir'),
		handle: 'silver_linings_bir',
		image: {
			file: 'the-house-from-above.jpg',
			alt: 'The original mud house from the air, four people waving from the porch, the garden gone wild in monsoon'
		},
		caption: 'August 2024, from the air.'
	},
	{
		platform: 'instagram',
		url: ig('silver_linings_bir'),
		handle: 'silver_linings_bir',
		image: { file: 'open-everyday.jpg', alt: 'Staff at the counter under a Timings sign' },
		caption: 'Good news: open every day.'
	},
	{
		platform: 'instagram',
		url: ig('thefoodessence'),
		handle: 'thefoodessence',
		image: { file: 'pizza.jpg', alt: 'A whole pizza on a wooden board' }
	},
	{
		platform: 'instagram',
		url: ig('vanikasangtani'),
		handle: 'vanikasangtani',
		image: {
			file: 'banana-pancake.jpg',
			alt: 'Banana and chocolate pancakes held up in the garden'
		},
		caption: 'Kisi ne banana pancake order kia tha?'
	},
	{
		platform: 'instagram',
		url: ig('altitudeseekness'),
		handle: 'altitudeseekness',
		image: {
			file: 'dog-coffee.jpg',
			alt: 'A man and a fluffy dog at a table with two cappuccinos'
		},
		caption: 'Right kind of coffee date.'
	},
	{
		platform: 'instagram',
		url: ig('thecrazygiftmaker'),
		handle: 'thecrazygiftmaker',
		image: { file: 'dog-garden.jpg', alt: 'A dog asleep in the sun by a shrub' }
	},
	{
		platform: 'instagram',
		url: ig('tanu_shishodia'),
		handle: 'tanu_shishodia',
		image: { file: 'strawberry-pie.jpg', alt: 'A slice of strawberry pie on the garden table' }
	},
	{
		platform: 'instagram',
		url: ig('jiyou_jiyou'),
		handle: 'jiyou_jiyou',
		image: {
			file: 'book-garden.jpg',
			alt: 'A book and a juice on a garden table under prayer flags'
		},
		caption: 'Slowest life.'
	},
	{
		platform: 'instagram',
		url: ig('thefoodessence'),
		handle: 'thefoodessence',
		image: { file: 'interior.jpg', alt: 'The counter and chalkboards inside the cafe' }
	},
	{
		platform: 'instagram',
		url: ig('vanikasangtani'),
		handle: 'vanikasangtani',
		image: { file: 'banoffee-hand.jpg', alt: 'A slice of banoffee pie held up in the garden' },
		caption: 'Apne ghar aagyi hun.'
	},
	{
		platform: 'instagram',
		url: ig('silver_linings_bir'),
		image: { file: 'gate-cute.jpg', alt: 'The gate sign seen from the lane' },
		caption: 'Cafes in Bir are dam cute.'
	}
];
