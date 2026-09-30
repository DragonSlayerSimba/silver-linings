/** Shared shapes for the content files in this folder. */

export type Money = number; // rupees

// Menu shapes live with their Zod schema so content and validation stay together.
export type {
	MenuItem,
	MenuCategory,
	MenuGroup,
	MenuTag,
	Price,
	AddOn
} from '$lib/config/menu-schema';

/** A photo in src/lib/assets/photos/<section>/ */
export interface Photo {
	file: string;
	alt: string;
	/** Who took it, e.g. an Instagram handle, shown as a credit. */
	credit?: string;
}

export interface Memory {
	/** ISO date or a loose label like "2019" */
	when: string;
	title: string;
	story: string;
	image?: Photo;
	/** Several small images instead of one, e.g. visitors' sketches. */
	gallery?: Photo[];
}

export interface SocialPost {
	platform: 'instagram' | 'facebook' | 'other';
	/** Link target: the post, or the poster's profile. */
	url: string;
	/** Instagram handle of whoever posted it; shown as the card's credit. */
	handle?: string;
	image: Photo;
	caption?: string;
}

export interface ShopItem {
	name: string;
	price?: Money;
	description: string;
	maker?: string;
	image?: Photo;
}

export interface HeroImage {
	/** File name inside src/lib/assets/photos/hero/ */
	file: string;
	alt: string;
	/** CSS object-position, e.g. '50% 40%'. Where to keep the subject when cropped. */
	position?: string;
}

export interface CafeEvent {
	title: string;
	/** ISO date, a weekday word for recurring events, or free text */
	when: string;
	description: string;
	recurring?: boolean;
	image?: Photo;
}
