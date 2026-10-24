import { defineMenu } from '$lib/config/menu-schema';

/**
 * The menu. Transcribed from the chalkboards photographed on 2026-10-12
 * (drinks board, juice board, food board, make-your-own pizza board) and the
 * dessert counter (2026-09-24). Photos and a line-by-line transcription are in
 * reources/menu-boards-2026-10-12/.
 *
 * Prices are as painted on the boards. Spelling is corrected where the chalk
 * had it wrong (Cappucino, Avacado, Brocolli, Falafal, Napolean). Bakes are
 * from the counter labels photographed 2026-10-22.
 *
 * Five unclear readings (poached egg, French omelette, 8 inch pizza, shakes,
 * extra hummus) were confirmed by the owner on 2026-10-22.
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
			{ name: 'Scrambled', price: 130 },
			{ name: 'Sunny Side Up', price: 80 },
			{ name: 'Mushroom Cheese Omelette', price: 150 },
			{ name: 'Veggie Cheese Omelette', price: 150 },
			{ name: 'Spinach Paneer Cheese Omelette', price: 150 },
			{
				name: 'Shakshouka',
				description: 'Eggs poached in spiced tomato, with pita bread.',
				price: 200,
				tags: ['signature', 'spicy'],
				image: {
					file: 'shakshouka.jpg',
					alt: 'Eggs poached in tomato and peppers in a cast-iron pan'
				}
			},
			{ name: 'Mushroom, Spinach & Cheese Omelette', price: 150 },
			{ name: 'Spinach, Corn & Cheese Omelette', price: 150 },
			{
				name: 'Egg Kejriwal',
				description: 'Cheese toast, fried egg, green chilli. A Bombay classic.',
				price: 150,
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
			{ name: 'Classic', price: 150 },
			{
				name: 'Nutella',
				price: 200,
				image: { file: 'nutella-pancake.jpg', alt: 'A stack of pancakes glazed with Nutella' }
			},
			{ name: 'Chocolate', price: 180 },
			{ name: 'Ragi Pancake', description: 'Finger millet batter.', price: 250 }
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
			{
				name: 'Besan Cheela',
				description: 'Savoury chickpea-flour pancake.',
				price: 130,
				tags: ['vegan']
			},
			{
				name: 'Ragi Cheela',
				description: 'The finger millet version.',
				price: 150,
				tags: ['vegan']
			},
			{ name: 'French Toast with Fruit', price: 150, tags: ['egg'] },
			{ name: 'Fruit Bowl', price: 150, tags: ['vegan'] },
			{ name: 'Fruit Bowl, Granola & Honey', price: 250 },
			{ name: 'Rosemary Potato Wedges', price: 150, tags: ['vegan'] },
			{ name: 'French Fries', price: 150, tags: ['vegan'] },
			{ name: 'Peri Peri Fries', price: 200, tags: ['vegan', 'spicy'] },
			{
				name: 'Veggie Stir Fry',
				price: 150,
				tags: ['vegan'],
				addOns: [{ name: 'Add egg', price: 70 }]
			},
			{ name: 'Veg Pakora', description: 'Onion or potato.', price: 200, tags: ['vegan'] },
			{
				name: 'Burrito',
				price: [
					{ label: 'Beans', price: 150 },
					{ label: 'Egg', price: 200 }
				]
			},
			{ name: 'Falafel, Hummus & Pita', price: 250, tags: ['vegan'] }
		]
	},
	{
		id: 'soups',
		title: 'Soups',
		group: 'food',
		icon: 'soup',
		tags: ['veg'],
		items: [
			{ name: 'Spinach & Black Pepper', price: 110 },
			{ name: 'Mushroom & Black Pepper', price: 120 },
			{ name: 'Broccoli & Almond', price: 150 }
		]
	},
	{
		id: 'salads',
		title: 'Salads',
		group: 'food',
		icon: 'salad',
		tags: ['veg', 'vegan'],
		items: [
			{ name: 'Jungle Salad', description: 'Whatever the garden gives that morning.', price: 150 },
			{ name: 'Avocado Salad', ingredients: ['avocado', 'tomato', 'cucumber'], price: 250 }
		]
	},
	{
		id: 'sandwiches',
		title: 'Sandwiches',
		group: 'food',
		icon: 'sandwich',
		tags: ['veg'],
		note: 'Extra hummus ₹70.',
		items: [
			{ name: 'Aubergine', price: 150 },
			{ name: 'Mushroom & Cheese', price: 180 },
			{ name: 'Spinach & Corn', price: 150 },
			{ name: 'Grilled Tomato & Cheese', price: 150 },
			{ name: 'Grilled Veg & Cheese', price: 180 },
			{
				name: 'Avocado Toast',
				price: 250,
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
			{ name: 'Lentil Burger', price: 130 },
			{ name: 'Chickpea Burger', price: 150 }
		]
	},
	{
		id: 'pasta',
		title: 'Pasta',
		group: 'food',
		icon: 'pasta',
		tags: ['veg'],
		items: [
			{ name: 'Alfredo', price: 200 },
			{ name: 'Arrabiata', price: 200, tags: ['vegan', 'spicy'] },
			{ name: 'Pink Sauce', price: 250 },
			{ name: 'Aglio e Olio', price: 250, tags: ['vegan'] }
		]
	},
	{
		id: 'pizza',
		title: 'Pizza',
		group: 'food',
		icon: 'pizza',
		blurb: 'Make your own: pick a size, a crust and your toppings.',
		tags: ['veg'],
		note: 'Crusts: thin, thick or Neapolitan. Toppings: paneer, mushroom, spinach, capsicum, corn, tomato, eggplant, onion.',
		items: [
			{
				name: 'Make Your Own',
				description: 'Any crust, any toppings.',
				price: [
					{ label: '8″', price: 280 },
					{ label: '10″', price: 380 },
					{ label: '12″', price: 480 }
				]
			},
			{
				name: 'Margherita',
				description: 'Special offer.',
				tags: ['signature'],
				price: [
					{ label: '8″', price: 150 },
					{ label: '10″', price: 200 },
					{ label: '12″', price: 250 }
				]
			}
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
			{ name: 'Espresso Shot', price: 80 },
			{ name: 'Freddo Espresso', description: 'Shaken over ice.', price: 100 },
			{ name: 'Americano', price: 90 },
			{ name: 'Affogato', description: 'Espresso over ice cream.', price: 150 },
			{ name: 'Latte', price: 120 },
			{
				name: 'Cappuccino',
				price: 130,
				image: { file: 'cappuccino.jpg', alt: 'Cappuccino with heart latte art and a biscuit' }
			},
			{ name: 'Flat White', price: 160 },
			{ name: 'Mocha', price: 140 },
			{ name: 'Cortado', price: 150 },
			{ name: 'Bullet Coffee', ingredients: ['espresso', 'ghee'], price: 150 },
			{ name: 'Iced Latte', subgroup: 'Cold', price: 150 },
			{ name: 'Iced Americano', subgroup: 'Cold', price: 120 },
			{ name: 'Iced Mocha', subgroup: 'Cold', price: 160 },
			{ name: 'Iced Cappuccino', subgroup: 'Cold', price: 150 },
			{ name: 'Iced Cortado', subgroup: 'Cold', price: 150 },
			{ name: 'Frappé', subgroup: 'Cold', price: 170 },
			{ name: 'Classic Cold Coffee', subgroup: 'Cold', price: 150 },
			{
				name: 'Iced Vietnamese',
				subgroup: 'Cold',
				description: 'Strong coffee over condensed milk.',
				price: 180
			}
		]
	},
	{
		id: 'teas',
		title: 'Teas',
		group: 'drinks',
		icon: 'tea',
		tags: ['veg'],
		items: [
			{ name: 'Masala Chai', price: 50, tags: ['signature'] },
			{ name: 'Chai', price: 40 },
			{ name: 'Black Tea', price: 40, tags: ['vegan'] },
			{ name: 'Green Tea', price: 60, tags: ['vegan'] },
			{ name: 'Ginger Lemon Honey', price: 60 },
			{
				name: 'Matcha',
				price: [
					{ label: 'Hot', price: 160 },
					{ label: 'Iced', price: 180 }
				]
			},
			{ name: 'Hot Chocolate', price: 140 }
		]
	},
	{
		id: 'juices',
		title: 'Fresh Juices',
		group: 'drinks',
		icon: 'juice',
		blurb: 'Pressed to order.',
		tags: ['veg', 'vegan'],
		items: [
			{ name: 'Mixed Juice', price: 180 },
			{ name: 'Watermelon', price: 150 },
			{ name: 'ABC', ingredients: ['apple', 'beetroot', 'carrot'], price: 150 },
			{ name: 'Kiwi', price: 180 },
			{ name: 'Carrot', price: 100 },
			{ name: 'Pineapple', price: 180 },
			{ name: 'Orange', price: 180 }
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
			{ name: 'Mint Lemonade', price: 150, tags: ['vegan'] },
			{ name: 'Iced Tea', price: 130, tags: ['vegan'] },
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
				ingredients: ['peanuts', 'cinnamon', 'flax seeds'],
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
					{ label: 'Banana / Mango', price: 150 },
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
		note: 'Everything but the brownie is eggless. All baked with butter.',
		tags: ['veg'],
		items: [
			{
				name: 'Banoffee Dreams',
				description: 'Our banoffee pie.',
				price: 130,
				tags: ['signature'],
				image: {
					file: 'banoffee-dreams.jpg',
					alt: 'A slice of Banoffee Dreams, cream dusted with cocoa'
				}
			},
			{ name: 'Lotus Biscoff Cheesecake', price: 250 },
			{
				name: 'Blueberry Cheesecake',
				price: 180,
				image: {
					file: 'blueberry-cheesecake.jpg',
					alt: 'A slice of blueberry cheesecake on the wooden rail'
				}
			},
			{
				name: 'Brownie',
				description: 'Walnuts on top. The one bake with egg.',
				price: 110,
				tags: ['egg'],
				image: {
					file: 'walnut-brownie.jpg',
					alt: 'Walnut brownie with two iced drinks on the terrace'
				}
			},
			{ name: 'Carrot Cake', price: 130 },
			{ name: 'Lemon Cake', price: 130 },
			{ name: 'Banana Walnut Cake', price: 130 },
			{
				name: 'Apple Pie',
				price: 150,
				addOns: [{ name: 'Ice cream', price: 50 }]
			},
			{ name: 'Persimmon Pie', price: 200, tags: ['seasonal'] },
			{
				name: 'Mangoffee Pie',
				description: 'Banoffee, but mango.',
				price: 180,
				tags: ['seasonal']
			},
			{ name: 'Strawberry Pie', price: 180, tags: ['seasonal'] }
		]
	},
	{
		id: 'cookies',
		title: 'Cookies',
		group: 'bakes',
		icon: 'cookie',
		blurb: 'From the jar by the coffee machine.',
		tags: ['veg'],
		items: [
			{
				name: 'Chocolate Oat Cookie',
				price: 40,
				image: {
					file: 'house-cookies.jpg',
					alt: 'A glass jar of oat cookies with glasses resting on the lid'
				}
			},
			{ name: 'Ragi Cookie', price: 50 },
			{ name: 'Butter Cookie', price: 30 }
		]
	}
]);
