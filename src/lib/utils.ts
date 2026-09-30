import config from '$config';
import type { Price } from '$lib/config/menu-schema';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function to12h(hhmm: string): string {
	const [h, m] = hhmm.split(':').map(Number);
	const suffix = h >= 12 ? 'pm' : 'am';
	const hour = h % 12 === 0 ? 12 : h % 12;
	return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`;
}

export function hoursLabel(): string {
	return `${to12h(config.hours.open)} – ${to12h(config.hours.close)}`;
}

export function closedDaysLabel(): string {
	const days = config.hours.closedDays.map((d) => dayNames[d]);
	if (days.length === 0) return 'Open every day';
	return `Closed on ${days.join(', ')}s`;
}

const currency = () => config.menu.currency;

/** "₹160", "from ₹150", or "₹150 / ₹200" for variants. Shop items pass a plain number. */
export function priceLabel(price: Price | undefined): string {
	if (price === undefined) return '';
	if (typeof price === 'number') return `${currency()}${price}`;
	if ('from' in price) return `from ${currency()}${price.from}`;
	return price.map((v) => `${currency()}${v.price}`).join(' / ');
}

export function rupees(n: number): string {
	return `${currency()}${n}`;
}

export function telHref(phone: string): string {
	return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
