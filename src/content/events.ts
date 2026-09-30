import type { CafeEvent } from './types';

// Events, with the cafe's own photos from Instagram. The market needs real dates from the owners.
export const events: CafeEvent[] = [
	{
		title: "Artists' Market",
		when: 'Weekends, spring',
		recurring: true,
		description: 'Local makers, music and the garden open late.',
		image: {
			file: 'chilling-in-billing.jpg',
			alt: 'People sitting on the grass under the trees, a monk on a cane chair'
		}
	},
	{
		title: 'A short history of Bir Tibetan Colony',
		when: '30 April 2018',
		description:
			'A conversation with Khenpo Ngawang of Dzongsar Monastery, on the grass under the big tree.',
		image: {
			file: 'tibetan-colony-talk.jpg',
			alt: 'Khenpo Ngawang in red robes speaking to a circle of people on the grass'
		}
	}
];
