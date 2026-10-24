import type { SiteConfig } from '$lib/config/schema';
import type { MenuCategory } from '$lib/config/menu-schema';

/**
 * schema.org CafeOrCoffeeShop for the home page: what feeds Google's knowledge panel,
 * "cafes near me" and rich results. Everything comes from site.config.ts and the menu.
 */
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function structuredData(config: SiteConfig, menu: MenuCategory[], image: string): string {
	const { contact, hours } = config;
	const prices = menu
		.flatMap((c) => c.items)
		.filter((it) => it.available)
		.flatMap((it) => {
			const p = it.price;
			if (typeof p === 'number') return [p];
			if (Array.isArray(p)) return p.map((v) => v.price);
			return p ? [p.from] : [];
		});
	const min = Math.min(...prices);
	const max = Math.max(...prices);

	// "Suja, Himachal Pradesh 176077" → locality, region, postcode; falls back to the raw line.
	const last = contact.address.lines.at(-1) ?? '';
	const m = /^(.*?),\s*(.*?)\s+(\d{6})$/.exec(last);
	const address = {
		'@type': 'PostalAddress',
		streetAddress: contact.address.lines[0],
		addressLocality: m?.[1] ?? last,
		addressRegion: m?.[2],
		postalCode: m?.[3],
		addressCountry: 'IN'
	};

	const data = {
		'@context': 'https://schema.org',
		'@type': 'CafeOrCoffeeShop',
		name: config.name,
		url: config.url,
		image,
		description: config.description,
		telephone: contact.phone,
		foundingDate: config.founded ? String(config.founded) : undefined,
		address,
		geo:
			contact.address.lat !== undefined && contact.address.lng !== undefined
				? {
						'@type': 'GeoCoordinates',
						latitude: contact.address.lat,
						longitude: contact.address.lng
					}
				: undefined,
		hasMap: contact.address.mapsUrl,
		sameAs: [contact.instagram].filter(Boolean),
		servesCuisine: 'Cafe',
		priceRange: Number.isFinite(min)
			? `${config.menu.currency}${min}–${config.menu.currency}${max}`
			: undefined,
		menu: `${config.url}/menu`,
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: DAYS.filter((_, i) => !hours.closedDays.includes(i)),
				opens: hours.open,
				closes: hours.close
			}
		]
	};
	// JSON.stringify drops undefined fields; "<" is escaped so the script tag can't be closed early.
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
