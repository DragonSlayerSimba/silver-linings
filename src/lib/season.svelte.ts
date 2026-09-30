import config from '$config';
import type { Season } from '$lib/config/schema';

/** Which ambient mood 'auto' resolves to right now on this clock. */
// eslint-disable-next-line svelte/prefer-svelte-reactivity -- plain value, never mutated or tracked
export function resolveSeason(now = new Date()): Season {
	const { mode, rainMonths, sunsetFromHour } = config.season;
	if (mode !== 'auto') return mode;
	if (now.getHours() >= sunsetFromHour) return 'sunset';
	if (rainMonths.includes(now.getMonth() + 1)) return 'rain';
	return 'greenery';
}

const state = $state<{ season: Season; forced: boolean }>({
	// Server render and first paint: a stable default so markup matches.
	season: config.season.mode === 'auto' ? 'greenery' : config.season.mode,
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

export const seasons: Season[] = ['greenery', 'rain', 'sunset'];
