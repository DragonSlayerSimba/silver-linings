import config from '$config';
import type { Season } from '$lib/config/schema';

/** Which ambient mood 'auto' resolves to right now on this clock. */
// eslint-disable-next-line svelte/prefer-svelte-reactivity -- plain value, never mutated or tracked
export function resolveSeason(now = new Date()): Season {
	const c = config.season;
	if (c.mode !== 'auto') return c.mode;
	const hour = now.getHours();
	if (hour >= c.nightFromHour || hour < 5) return 'night';
	if (c.snowMonths.includes(now.getMonth() + 1)) return 'snow';
	return 'golden-hour';
}

const state = $state<{ season: Season; forced: boolean }>({
	// Server render and first paint: a stable default so markup matches.
	season: config.season.mode === 'auto' ? 'golden-hour' : config.season.mode,
	forced: false
});

export const season = {
	get current() {
		return state.season;
	},
	/** Recompute from the clock unless a visitor has picked one by hand. */
	sync() {
		if (!state.forced) state.season = resolveSeason();
	},
	set(next: Season) {
		state.forced = true;
		state.season = next;
	},
	reset() {
		state.forced = false;
		state.season = resolveSeason();
	}
};

export const seasons: Season[] = ['golden-hour', 'night', 'snow'];

/** 'golden-hour' → 'Golden hour' */
export const seasonLabel = (s: Season) =>
	(s.charAt(0).toUpperCase() + s.slice(1)).replace('-', ' ');
