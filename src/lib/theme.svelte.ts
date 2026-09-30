import { dev } from '$app/environment';
import config from '$config';
import type {
	Accent,
	Board,
	HeroHeader,
	HeroPhoto,
	HeroText,
	MemoryLayout,
	SkyName,
	Surface,
	SunsetPhoto
} from '$lib/config/schema';

/**
 * Runtime theme choices. Defaults come from site.config.ts; the switcher
 * (when enabled) overrides them and remembers the choice in localStorage
 * so reloads while editing keep the same look.
 */
const KEY = 'sl-theme';

/**
 * The Theme lab only runs on the local dev server (`npm run dev`), never in a
 * build, so deployed copies always show the config defaults.
 */
export const labOn = dev && config.theme.switcher;
const greenNames = Object.keys(config.theme.greenSets);

const defaults = () => ({
	accent: config.theme.accent as Accent,
	surface: config.theme.surface as Surface,
	greens: config.theme.greens,
	header: config.theme.hero.header as HeroHeader,
	photo: config.theme.hero.photo as HeroPhoto,
	text: config.theme.hero.text as HeroText,
	board: config.theme.board as Board,
	memory: config.theme.memory as MemoryLayout,
	sunsetPhoto: config.theme.sunsetPhoto as SunsetPhoto,
	sky: config.theme.sky as SkyName
});
type ThemeState = ReturnType<typeof defaults>;

const state = $state<ThemeState>(defaults());

export const theme = {
	get accent() {
		return state.accent;
	},
	get surface() {
		return state.surface;
	},
	get greens() {
		return state.greens;
	},
	get header() {
		return state.header;
	},
	get photo() {
		return state.photo;
	},
	get text() {
		return state.text;
	},
	get board() {
		return state.board;
	},
	get memory() {
		return state.memory;
	},
	get sunsetPhoto() {
		return state.sunsetPhoto;
	},
	get sky() {
		return state.sky;
	},
	get greenSet() {
		return config.theme.greenSets[state.greens] ?? config.theme.greenSets[greenNames[0]];
	},
	/** Hex for the accent role, resolved against the palette. */
	get accentColour() {
		const p = config.palette;
		return state.accent === 'brick' ? p.brick : state.accent === 'table' ? p.table : p.log;
	},
	set(patch: Partial<ThemeState>) {
		Object.assign(state, patch);
		try {
			localStorage.setItem(KEY, JSON.stringify(state));
		} catch {
			/* private mode etc. */
		}
	},
	reset() {
		Object.assign(state, defaults());
		try {
			localStorage.removeItem(KEY);
		} catch {
			/* ignore */
		}
	},
	/** Restore a remembered choice; call once on mount. */
	restore() {
		if (!labOn) return;
		try {
			const raw = localStorage.getItem(KEY);
			if (!raw) return;
			const saved = JSON.parse(raw) as Partial<ThemeState>;
			for (const k of Object.keys(state) as (keyof ThemeState)[]) {
				const v = saved[k];
				if (typeof v === 'string' && (options[k] ?? greenNames).includes(v)) {
					(state as Record<string, string>)[k] = v;
				}
			}
		} catch {
			/* ignore */
		}
	}
};

export const options: Record<keyof ThemeState, string[]> = {
	accent: ['brick', 'table', 'log'],
	surface: ['cream', 'ochre', 'hybrid'],
	greens: greenNames,
	header: ['scrim', 'frosted', 'hidden'],
	photo: ['natural', 'dark', 'tint'],
	text: ['left', 'center', 'panel'],
	board: ['slate', 'wood', 'none'],
	memory: ['strip', 'timeline'],
	sunsetPhoto: ['off', 'page', 'band'],
	sky: ['drone', 'meadow', 'ember']
};
