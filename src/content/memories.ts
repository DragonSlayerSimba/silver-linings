import type { Memory } from './types';

/**
 * "Down the memory lane": the cafe's own story, in the cafe's own photos.
 * Every picture here is from @silver_linings_bir's Instagram (2018–2021),
 * captured 2026-09-24 at ~1090px; ask the owners for originals before launch.
 * Dates are the post dates. Quotes in `story` are from the captions.
 *
 * Facts learned from the posts: the cafe opened on 13 October 2016
 * ("We are 2!" on 13 Oct 2018); the mud house was there from the start; the
 * stone room was built in summer 2018 while the cafe "didn't even have a
 * name"; the bottle wall is the cafe's own plastic waste, June–July 2018.
 */
export const memories: Memory[] = [
	{
		when: 'October 2016',
		title: 'Before we had a name',
		story:
			'Doors opened on 13 October 2016 "with little idea of how or what things are going to be". Stone walls, a slate roof, no doors or windows yet, and the corn already growing beside it. Posted two years later as "memories from when we didn\'t even have a name".',
		image: {
			file: '2018-06-no-name-yet.jpg',
			alt: 'The stone building under a new slate roof, still without doors or windows, corn growing beside it'
		}
	},
	{
		when: 'February 2018',
		title: 'A hot cup under a February sky',
		story:
			'The first photo on the account: the little mud house, the slate roof, cane chairs on the porch and a blue-and-red hut by the gate.',
		image: {
			file: '2018-02-first-post.jpg',
			alt: 'The original mud house with its slate roof, seen across the garden in February 2018'
		}
	},
	{
		when: 'August 2018',
		title: 'Bhalu and Romeo',
		story: 'The cafe dogs, keeping watch from the corn.',
		image: {
			file: '2018-08-bhalu-and-romeo.jpg',
			alt: 'Bhalu, a golden dog, and Romeo, a small white dog, in the tall corn'
		}
	},
	{
		when: 'March 2018',
		title: 'Spring dusk',
		story: 'The cafe at dusk under a purple spring sky.',
		image: { file: '2018-03-spring-dusk.jpg', alt: 'The cafe at dusk under a purple spring sky' }
	},
	{
		when: 'Spring 2018',
		title: '"Yellow lights, purple windows, golden flowers, silver linings."',
		story:
			'Marigolds along the path, purple window frames, a signpost pointing everywhere. Days warming up, nights still cold enough for a fleece.',
		image: {
			file: '2018-03-marigolds.jpg',
			alt: 'Marigolds in front of the cafe at dusk, lights on inside'
		},
		gallery: [
			{
				file: '2018-03-cafe-spring.jpg',
				alt: 'The cafe in spring sunshine with wild flowers in the meadow'
			}
		]
	},
	{
		when: 'May 2018',
		title: '"This maybe a cafe"',
		story:
			'"For those who insisted that we have a cafe sign outside, here is something we did reluctantly." A plank of blue paint on a pile of stones. Behind it, the stones are for something bigger.',
		image: {
			file: '2018-05-maybe-a-cafe-sign.jpg',
			alt: 'A hand-painted blue plank reading THIS MAYBE A CAFE propped on rocks in front of the cafe'
		}
	},
	{
		when: 'August 2018',
		title: 'Monsoon look',
		story: 'The corn closes in around the porch and the roof runs with rain.',
		image: {
			file: '2018-08-monsoon-corn.jpg',
			alt: 'The mud house in monsoon, corn taller than the porch'
		}
	},
	{
		when: 'June 2018',
		title: 'A wall made of rubbish',
		story:
			'"We made a new wall from lots of plastic trash, mud and a bit of cement." Every bottle is stuffed with the cafe\'s own wrappers. "So proud that we let zero plastic waste escape our premises."',
		image: {
			file: '2018-06-bottle-wall-building.jpg',
			alt: 'The half-built wall of plastic bottles set in blue-painted mud, bottle bases showing'
		}
	},
	{
		when: '13 October 2018',
		title: 'We are two',
		story: '"We have come a long way with the amazing love and support from all you guys."',
		image: {
			file: '2018-10-second-birthday.jpg',
			alt: 'The cafe on its second birthday: purple door, corn and beans in the garden, evening light'
		}
	},
	{
		when: '2020',
		title: 'Open again',
		story:
			'Back after the lockdown, "a large open and fresh space". By December the gate had its red CAFE sign.',
		image: {
			file: '2020-12-cafe-sign.jpg',
			alt: 'The wooden gate with red hand-painted CAFE and SILVER LININGS signs, the mud house behind'
		}
	},
	{
		when: '2021',
		title: 'The gate',
		story:
			'A roofed gate with the timings painted on, the garden from above under a storm sky, and inside the new room "the master chef of Silver Linings, Harish Thakur".',
		image: {
			file: '2021-01-gate-sign.jpg',
			alt: 'The roofed gate with the Silver Linings sign, timing and open boards'
		},
		gallery: [
			{
				file: '2021-06-from-above.jpg',
				alt: 'The cafe and garden from above under a storm sky, the gate in the foreground'
			},
			{
				file: '2021-06-master-chef.jpg',
				alt: 'Harish Thakur behind the counter under the timber roof'
			}
		]
	}
];
