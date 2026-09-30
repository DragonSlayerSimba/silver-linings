import { defineMenu } from '$lib/config/menu-schema';

/**
 * The menu. Transcribed 2026-09-24 from the chalkboards and the dessert counter.
 *
 * Drinks prices are as painted on the board. FOOD PRICES ARE PLACEHOLDERS
 * (the food board was unreadable in the photos) — replace before launch, or
 * set menu.showPrices to false in site.config.ts to hide them meanwhile.
 *
 * Shape: group (food | drinks | bakes) → category → items. Category `tags`
 * apply to every item; item `tags` add to them. `subgroup` puts a small
 * heading inside a category. Omit `price` while it is unknown.
 *
 * `image` files live in src/lib/assets/photos/menu/. The six in use are real
 * dishes cropped from customer stories the cafe reposted on Instagram (chosen
 * by eye over 21 alternatives on 2026-09-24): check with the posters before
 * launch, or replace with the cafe's own shots under the same file names.
 */
export const menu = defineMenu([
	/* ------------------------------------------------------------ food */
	{
		id: 'eggs',
		title: 'Eggs',
		group: 'food',
		icon: 'eggs',
		blurb: 'Morning starts here. Served with toast.',
		tags: ['egg'],
		items: [
			{ name: 'Scrambled', price: 140 },
			{ name: 'Sunny Side Up', price: 120 },
			{ name: 'Poached Egg', price: 140 },
			{ name: 'French Omelette', price: 150 },
			{ name: 'Mushroom Cheese Omelette', price: 180 },
			{ name: 'Veggie Cheese Omelette', price: 170 },
			{ name: 'Spinach Paneer Cheese Omelette', price: 190 },
			{ name: 'Mushroom, Spinach & Cheese Omelette', price: 190 },
			{ name: 'Spinach, Corn & Cheese Omelette', price: 180 },
			{
				name: 'Shakshouka',
				description: 'Eggs poached in spiced tomato, with pita bread.',
				price: 220,
				tags: ['signature', 'spicy'],
				image: {
					file: 'shakshouka.jpg',
					alt: 'Eggs poached in tomato and peppers in a cast-iron pan'
				}
			},
			{
				name: 'Egg Kejriwal',
				description: 'Cheese toast, fried egg, green chilli. A Bombay classic.',
				price: 180,
				tags: ['spicy']
			}
		]
	},
	{
		id: 'pancakes',
		title: 'Pancakes',
		group: 'food',
		icon: 'pancakes',
		tags: ['veg'],
		addOns: [{ name: 'Add fruit', price: 70 }],
		items: [
			{ name: 'Classic', price: 160 },
			{
				name: 'Nutella',
				price: 200,
				image: { file: 'nutella-pancake.jpg', alt: 'A stack of pancakes glazed with Nutella' }
			},
			{ name: 'Chocolate', price: 190 }
		]
	},
	{
		id: 'plates',
		title: 'Plates & Bowls',
		group: 'food',
		icon: 'bowl',
		blurb: 'Small plates, big bowls and things to share.',
		tags: ['veg'],
		note: 'Sides at ₹70: veggies, potatoes, lentil or chickpea patty, garlic bread, fruit.',
		items: [
			{ name: 'French Toast with Fruit', price: 190, tags: ['egg'] },
			{ name: 'Fruit Bowl', price: 150, tags: ['vegan'] },
			{ name: 'Fruit Bowl, Granola & Honey', price: 200 },
			{ name: 'Rosemary Potato Wedges', price: 150, tags: ['vegan'] },
			{ name: 'French Fries', price: 130, tags: ['vegan'] },
			{ name: 'Peri Peri Fries', price: 150, tags: ['vegan', 'spicy'] },
			{
				name: 'Veggie Stir Fry',
				price: 200,
				tags: ['vegan'],
				addOns: [{ name: 'Add egg', price: 40 }]
			},
			{ name: 'Veg Pakora', price: 140, tags: ['vegan'] },
			{
				name: 'Burrito',
				price: [
					{ label: 'Beans', price: 220 },
					{ label: 'Egg', price: 240 }
				]
			},
			{ name: 'Falafel & Hummus', price: 220, tags: ['vegan'] }
		]
	},
	{
		id: 'soups',
		title: 'Soups',
		group: 'food',
		icon: 'soup',
		tags: ['veg'],
		items: [
			{ name: 'Spinach & Black Pepper', price: 150 },
			{ name: 'Mushroom & Black Pepper', price: 150 },
			{ name: 'Broccoli & Almond', price: 170 }
		]
	},
	{
		id: 'salads',
		title: 'Salads',
		group: 'food',
		icon: 'salad',
		tags: ['veg', 'vegan'],
		items: [
			{ name: 'Jungle Salad', description: 'Whatever the garden gives that morning.', price: 200 },
			{ name: 'Avocado Salad', ingredients: ['avocado', 'tomato', 'cucumber'], price: 250 }
		]
	},
	{
		id: 'sandwiches',
		title: 'Sandwiches',
		group: 'food',
		icon: 'sandwich',
		tags: ['veg'],
		items: [
			{ name: 'Aubergine', price: 180 },
			{ name: 'Mushroom & Cheese', price: 190 },
			{ name: 'Spinach & Corn', price: 180 },
			{ name: 'Grilled Tomato & Cheese', price: 170 },
			{ name: 'Grilled Veg & Cheese', price: 180 },
			{
				name: 'Avocado Toast',
				price: 220,
				tags: ['vegan', 'signature']
			}
		]
	},
	{
		id: 'burgers',
		title: 'Burgers',
		group: 'food',
		icon: 'burger',
		tags: ['veg'],
		items: [
			{ name: 'Lentil Burger', price: 200 },
			{ name: 'Chickpea Burger', price: 200 }
		]
	},
	{
		id: 'pasta',
		title: 'Pasta',
		group: 'food',
		icon: 'pasta',
		tags: ['veg'],
		items: [
			{ name: 'Alfredo', price: 250 },
			{ name: 'Arrabiata', price: 220, tags: ['vegan', 'spicy'] },
			{ name: 'Pink Sauce', price: 250 }
		]
	},
	{
		id: 'pizza',
		title: 'Pizza',
		group: 'food',
		icon: 'pizza',
		blurb: 'Thin base, wood-fired oven.',
		tags: ['veg'],
		items: [
			{ name: 'Margherita', price: 250 },
			{ name: 'Garden Veg', price: 290 },
			{ name: 'Mushroom & Corn', price: 290 }
		]
	},

	/* ---------------------------------------------------------- drinks */
	{
		id: 'coffee',
		title: 'Coffee',
		group: 'drinks',
		icon: 'coffee',
		blurb: 'Silver lining in a cup.',
		tags: ['veg'],
		items: [
			{ name: 'Espresso', price: 90 },
			{ name: 'Americano', price: 110 },
			{
				name: 'Cappuccino',
				price: 140,
				image: { file: 'cappuccino.jpg', alt: 'Cappuccino with heart latte art and a biscuit' }
			},
			{ name: 'Latte', price: 150 },
			{ name: 'Cold Brew', price: 160 }
		]
	},
	{
		id: 'teas',
		title: 'Teas',
		group: 'drinks',
		icon: 'tea',
		tags: ['veg'],
		items: [
			{
				name: 'Masala Chai',
				price: 50,
				tags: ['signature']
			},
			{ name: 'Black Tea', price: 40 },
			{ name: 'Green Tea', price: 40, tags: ['vegan'] },
			{ name: 'Lemon Honey Ginger', price: 60 },
			{ name: 'Mint Tea', price: 60, tags: ['vegan'] },
			{ name: 'Hot Chocolate', price: 140 }
		]
	},
	{
		id: 'coolers',
		title: 'Coolers',
		group: 'drinks',
		icon: 'cooler',
		tags: ['veg'],
		items: [
			{ name: 'Lemonade', price: 100, tags: ['vegan'] },
			{ name: 'Mint Lemonade', price: 130, tags: ['vegan'] },
			{ name: 'Iced Tea', price: 120, tags: ['vegan'] },
			{ name: 'Lemon Soda', price: 120, tags: ['vegan'] },
			{ name: 'Masala Lassi', price: 120 },
			{ name: 'Banana Lassi', price: 120 },
			{ name: 'Mango Lassi', price: 150, tags: ['seasonal'] },
			{ name: 'Kombucha', price: 150, tags: ['vegan'] }
		]
	},
	{
		id: 'smoothies',
		title: 'Smoothies & Shakes',
		group: 'drinks',
		icon: 'smoothie',
		tags: ['veg'],
		items: [
			{
				name: 'Sunrise',
				subgroup: 'Non-dairy',
				ingredients: ['pineapple', 'ginger', 'coconut', 'turmeric', 'banana'],
				price: 160,
				tags: ['vegan']
			},
			{
				name: 'Papaya',
				subgroup: 'Non-dairy',
				ingredients: ['papaya', 'lemon', 'banana'],
				price: 160,
				tags: ['vegan']
			},
			{
				name: 'Green',
				subgroup: 'Non-dairy',
				ingredients: ['spinach', 'orange', 'banana'],
				price: 160,
				tags: ['vegan']
			},
			{
				name: 'Silver Linings',
				subgroup: 'Dairy',
				ingredients: ['peanuts', 'cinnamon', 'flax seeds', 'banana'],
				price: 160,
				tags: ['signature']
			},
			{
				name: 'Avocado',
				subgroup: 'Dairy',
				ingredients: ['avocado', 'almond', 'banana'],
				price: 310
			},
			{ name: 'Banana Iced Latte', subgroup: 'Dairy', price: 170 },
			{ name: 'Nutella Banana', subgroup: 'Dairy', price: 200 },
			{
				name: 'Shakes',
				subgroup: 'Dairy',
				price: [
					{ label: 'Banana', price: 150 },
					{ label: 'Mango', price: 200 },
					{ label: 'Strawberry', price: 200 }
				]
			},
			{ name: 'Oreo Shake', subgroup: 'Dairy', price: 180 }
		]
	},

	/* ----------------------------------------------------------- bakes */
	{
		id: 'bakes',
		title: 'Bakes & Desserts',
		group: 'bakes',
		icon: 'cake',
		blurb: 'From the counter. Baked in small batches, gone by evening.',
		tags: ['veg'],
		items: [
			{
				name: 'Banoffee Dreams',
				description: 'Our banoffee pie.',
				price: 180,
				tags: ['signature'],
				image: {
					file: 'banoffee-dreams.jpg',
					alt: 'A slice of Banoffee Dreams, cream dusted with cocoa'
				}
			},
			{
				name: 'Mangoffee Pie',
				description: 'Banoffee, but mango.',
				price: 180,
				tags: ['seasonal']
			},
			{
				name: 'Walnut Brownie',
				price: 150,
				image: {
					file: 'walnut-brownie.jpg',
					alt: 'Walnut brownie with two iced drinks on the terrace'
				}
			},
			{
				name: 'Blueberry Cheesecake',
				price: 220,
				image: {
					file: 'blueberry-cheesecake.jpg',
					alt: 'A slice of blueberry cheesecake on the wooden rail'
				}
			},
			{
				name: 'Persimmon Pie',
				price: 180,
				tags: ['seasonal']
			},
			{
				name: 'Strawberry Pie',
				price: 180,
				tags: ['seasonal']
			},
			{
				name: 'Tea Cake',
				price: 120
			},
			{
				name: 'House Cookies',
				description: 'Oat and chocolate, from the jar by the coffee machine.',
				price: 60,
				image: {
					file: 'house-cookies.jpg',
					alt: 'A glass jar of oat cookies with glasses resting on the lid'
				}
			},
			{
				// From the old website, not on the current boards. Flip `available` when confirmed.
				name: 'Cocoa Mud Cups',
				description: 'Mud cafe, mud cups.',
				price: 150,
				tags: ['signature'],
				available: false
			}
		]
	}
]);
