import type { CafeEvent } from './types';

// Events. The market needs real dates from the owners; music is whenever someone brings an instrument.
export const events: CafeEvent[] = [
	{
		title: "Artists' Market",
		when: 'Weekends, spring',
		recurring: true,
		description:
			'Local makers set up on the grass: jewellery, prints, pottery, and the garden open late.',
		image: {
			file: 'artists-market-stall.jpg',
			alt: 'A market stall of handmade jewellery on a white cloth in the garden, a cane chair beside it',
			credit: 'colourmejewels'
		}
	},
	{
		title: 'Music, any and all the time',
		when: 'Whenever',
		recurring: true,
		description:
			'No stage, no schedule. Someone sits on the terrace with an instrument and the afternoon changes.',
		image: {
			file: 'music-on-the-terrace.jpg',
			alt: 'A musician in a pink turban playing a stringed instrument on a chair in the garden'
		}
	}
];
