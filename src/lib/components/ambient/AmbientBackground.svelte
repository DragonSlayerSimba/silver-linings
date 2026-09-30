<script lang="ts">
	import config from '$config';
	import { season } from '$lib/season.svelte';

	// Fixed layer behind everything. Three moods stacked; the active one fades in.
	const calm = config.calm;
</script>

<div class="ambient" class:calm data-season={season.current} aria-hidden="true">
	<div class="layer greenery">
		<span class="blob b1"></span>
		<span class="blob b2"></span>
		<span class="blob b3"></span>
	</div>
	<div class="layer rain">
		<span class="streaks"></span>
		<span class="streaks far"></span>
	</div>
	<div class="layer sunset">
		<span class="sun"></span>
	</div>
	<div class="absolute inset-0 grain"></div>
</div>

<style>
	.ambient {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		background: var(--sl-surface);
	}
	.layer {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 1.6s var(--ease-soft);
	}
	[data-season='greenery'] .greenery,
	[data-season='rain'] .rain,
	[data-season='sunset'] .sunset {
		opacity: 1;
	}

	/* Greenery: soft light with slow drifting leaf-coloured blobs */
	.greenery {
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--sl-surface) 85%, var(--sl-leaf)),
			var(--sl-surface) 60%
		);
	}
	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		opacity: 0.45;
		animation: drift 28s ease-in-out infinite alternate;
	}
	.b1 {
		width: 42vmax;
		height: 42vmax;
		left: -12vmax;
		top: -10vmax;
		background: var(--sl-leaf);
	}
	.b2 {
		width: 36vmax;
		height: 36vmax;
		right: -10vmax;
		top: 20vh;
		background: var(--sl-moss);
		animation-delay: -9s;
		animation-duration: 34s;
	}
	.b3 {
		width: 30vmax;
		height: 30vmax;
		left: 30vw;
		bottom: -14vmax;
		background: color-mix(in oklab, var(--sl-sky) 60%, var(--sl-leaf));
		animation-delay: -18s;
		animation-duration: 40s;
	}
	@keyframes drift {
		from {
			transform: translate3d(0, 0, 0) scale(1);
		}
		to {
			transform: translate3d(6vw, 4vh, 0) scale(1.08);
		}
	}

	/* Rain: muted sky with falling streaks */
	.rain {
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--sl-periwinkle) 45%, var(--sl-surface)),
			color-mix(in oklab, var(--sl-surface) 80%, var(--sl-sky)) 70%
		);
	}
	.streaks {
		position: absolute;
		inset: -20% 0;
		background-image: repeating-linear-gradient(
			100deg,
			transparent 0 18px,
			color-mix(in oklab, var(--sl-silver) 50%, transparent) 18px 19px,
			transparent 19px 47px
		);
		opacity: 0.35;
		animation: fall 0.9s linear infinite;
	}
	.streaks.far {
		background-size: 60% 60%;
		opacity: 0.18;
		animation-duration: 1.5s;
	}
	@keyframes fall {
		from {
			transform: translate3d(0, -12%, 0);
		}
		to {
			transform: translate3d(-3%, 12%, 0);
		}
	}

	/* Sunset: warm gradient with a low sun */
	.sunset {
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--sl-sunset-to) 55%, var(--sl-cream)),
			color-mix(in oklab, var(--sl-sunset-from) 60%, var(--sl-surface)) 45%,
			var(--sl-surface) 85%
		);
	}
	.sun {
		position: absolute;
		left: 50%;
		top: 38vh;
		width: 46vmin;
		height: 46vmin;
		transform: translateX(-50%);
		border-radius: 50%;
		background: radial-gradient(circle, var(--sl-sunset-from), transparent 70%);
		opacity: 0.8;
		animation: glow 8s ease-in-out infinite alternate;
	}
	@keyframes glow {
		to {
			opacity: 0.55;
			transform: translateX(-50%) scale(1.06);
		}
	}

	.calm .blob,
	.calm .streaks,
	.calm .sun {
		animation: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.blob,
		.streaks,
		.sun {
			animation: none;
		}
	}
</style>
