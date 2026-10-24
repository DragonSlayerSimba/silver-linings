import type { ShopGroup } from './types';

// "Made with love in Bir": the two shelves by the counter, photographed 2026-10-22.
// Prices and makers' QR codes are on the shelf itself.
export const shopGroups: ShopGroup[] = [
	{
		title: 'Local produce',
		description:
			'Kangra Bliss teas from Palampur (rose, blue pea, Kashmiri kahwa, tulsi ginger, jasmine green), sea buckthorn pulp from the high valleys, and Ney Thuk, a Tibetan barley porridge from 4,200 m.',
		image: {
			file: 'local-produce.jpg',
			alt: 'Jars of Kangra Bliss teas, a bottle and tins of sea buckthorn pulp and a bag of Ney Thuk porridge on the wooden counter'
		}
	},
	{
		title: 'Artists',
		description:
			'Made by people who sit here. Clay magnets from Bir Clay Studio, 3D-printed bookmarks by Red Kite Studio, hand-painted Shin-chan magnets and watercolour cards. Pay the maker directly.',
		image: {
			file: 'artists.jpg',
			alt: 'Hand-painted cartoon magnets, clay magnets on watercolour cards, a basket of art cards and a stand of 3D-printed bookmarks'
		}
	}
];
