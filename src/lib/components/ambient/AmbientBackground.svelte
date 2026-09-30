<script lang="ts">
	import config from '$config';
	import { season } from '$lib/season.svelte';
	import { theme } from '$lib/theme.svelte';
	import { skyPhoto } from '$lib/mood-photos';

	// Fixed layer behind everything. One layer per mood, stacked; the active one fades in.
	// Earlier moods (greenery, rain, mist, silver lining) are kept in reources/dev/.
	const calm = config.calm;
	const sky = $derived(skyPhoto(theme.sky));
	// The sky photo blends over every mood while the lab's Sunset row is 'page' (the default).
	const showPhoto = $derived(theme.sunsetPhoto === 'page');
</script>

<div class="ambient" class:calm data-season={season.current} aria-hidden="true">
	<div class="layer golden-hour"></div>
	<div class="layer night">
		<span class="moon"></span>
		<span class="stars"></span>
		<span class="stars twinkle"></span>
	</div>
	<div class="layer snow">
		<span class="flakes"></span>
		<span class="flakes near"></span>
	</div>
	{#if showPhoto}
		<!-- The sky photo (Theme lab → Sky) behind the whole page. Blended as colour only, so
		     the page keeps its lightness and text stays readable; fades out towards the bottom. -->
		<div class="photo">
			{#key sky.file}
				<enhanced:img
					src={sky.src}
					alt=""
					sizes="100vw"
					class="size-full object-cover"
					style={`object-position: ${sky.position}`}
				/>
			{/key}
		</div>
	{/if}
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
	[data-season='golden-hour'] .golden-hour,
	[data-season='night'] .night,
	[data-season='snow'] .snow {
		opacity: 1;
	}

	/* Golden hour: the rain mood's cool gradient, no streaks. Under the colour-blended
	   sky photo only its brightness shows, which gives the photo a soft, even dusk. */
	.golden-hour {
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--sl-periwinkle) 45%, var(--sl-surface)),
			color-mix(in oklab, var(--sl-surface) 80%, var(--sl-sky)) 70%
		);
	}
	/* Night: dusky blue with a moon and stars. Kept mid-tone so ink text stays readable;
	   a true dark night would need a dark theme for the content too. */
	.night {
		background: linear-gradient(
			180deg,
			color-mix(in oklab, #1d2346 55%, var(--sl-periwinkle)),
			color-mix(in oklab, #2b335e 30%, var(--sl-surface)) 45%,
			color-mix(in oklab, var(--sl-periwinkle) 18%, var(--sl-surface)) 85%
		);
	}
	.moon {
		position: absolute;
		right: 12vw;
		top: 9vh;
		width: 9vmin;
		height: 9vmin;
		border-radius: 50%;
		background: radial-gradient(circle at 40% 40%, #fbf6e8, #e6e1d2 60%, #cfcabd);
		box-shadow: 0 0 60px 18px color-mix(in oklab, #fbf6e8 35%, transparent);
	}
	.stars {
		position: absolute;
		inset: 0 0 45% 0;
		background-image:
			radial-gradient(1.5px 1.5px at 20px 30px, #fff, transparent),
			radial-gradient(1px 1px at 90px 120px, #fff, transparent),
			radial-gradient(1.5px 1.5px at 160px 60px, #fff, transparent),
			radial-gradient(1px 1px at 230px 170px, #fff, transparent),
			radial-gradient(1px 1px at 60px 200px, #fff, transparent);
		background-size: 260px 230px;
		mask-image: linear-gradient(180deg, black 30%, transparent);
		opacity: 0.8;
	}
	.stars.twinkle {
		background-size: 370px 310px;
		background-position: 120px 80px;
		animation: twinkle 4s ease-in-out infinite alternate;
	}
	@keyframes twinkle {
		to {
			opacity: 0.2;
		}
	}

	/* Snow: cold light and slowly falling flakes */
	.snow {
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--sl-sky) 70%, white),
			color-mix(in oklab, var(--sl-sky) 30%, var(--sl-surface)) 55%,
			var(--sl-surface) 90%
		);
	}
	.flakes {
		position: absolute;
		inset: 0;
		background-image:
			radial-gradient(2px 2px at 30px 40px, #fff, transparent),
			radial-gradient(3px 3px at 120px 90px, #fff, transparent),
			radial-gradient(2px 2px at 200px 150px, #fff, transparent),
			radial-gradient(2.5px 2.5px at 70px 170px, #fff, transparent);
		background-size: 240px 200px;
		opacity: 0.9;
		filter: drop-shadow(0 0 1px color-mix(in oklab, var(--sl-ink) 25%, transparent));
		animation: snowfall 18s linear infinite;
	}
	.flakes.near {
		background-size: 380px 320px;
		opacity: 0.7;
		filter: blur(1px) drop-shadow(0 0 1px color-mix(in oklab, var(--sl-ink) 25%, transparent));
		animation-duration: 11s;
	}
	@keyframes snowfall {
		from {
			background-position:
				0 0,
				0 0,
				0 0,
				0 0;
		}
		to {
			background-position:
				60px 400px,
				-40px 400px,
				40px 400px,
				-20px 400px;
		}
	}
	.flakes.near {
		animation-name: snowfall-near;
	}
	@keyframes snowfall-near {
		to {
			background-position:
				80px 640px,
				-60px 640px,
				50px 640px,
				-30px 640px;
		}
	}

	.photo {
		position: absolute;
		inset: 0;
		mix-blend-mode: color;
		opacity: 0.9;
		mask-image: linear-gradient(180deg, black 30%, transparent 95%);
	}

	.calm .twinkle,
	.calm .flakes {
		animation: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.twinkle,
		.flakes {
			animation: none;
		}
	}
</style>
