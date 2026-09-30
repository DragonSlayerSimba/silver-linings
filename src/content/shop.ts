import type { ShopItem } from './types';

// "Made with love in Bir": small things sold at the counter. Photos from the cafe's own posts.
export const shopItems: ShopItem[] = [
	{
		name: 'Shunya Farm pickles',
		description: 'Turnip, carrot, French beans and beetroot, pickled in apple cider vinegar.',
		maker: 'Shunya Farm, Bir',
		image: {
			file: 'shunya-pickles.jpg',
			alt: 'Four jars of pickles with handwritten labels on a wooden table'
		}
	},
	{
		name: 'Postcards of Bir',
		description:
			'Paragliders at sunset, wheat fields, a backpacker. Drawn by regulars, printed for the counter.',
		image: {
			file: 'postcards.jpg',
			alt: 'Two polaroid-style postcards of Bir: a paraglider at sunset and a wheat field'
		}
	},
	{
		name: 'Illustrated postcards',
		description: 'The backpacker series by a Silver Linings regular.',
		maker: '@thoughtrecorder',
		image: {
			file: 'postcard-backpacker.jpg',
			alt: 'A postcard of a backpacker by a lake, stamped Silver Linings Bir Billing'
		}
	}
];
