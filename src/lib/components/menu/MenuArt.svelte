<script module lang="ts">
	import { theme } from '$lib/theme.svelte';

	/** Categories (by icon key) that have a bespoke drawing. */
	export const bespoke = [
		'eggs',
		'pancakes',
		'sandwich',
		'pizza',
		'coffee',
		'cooler',
		'cake',
		'cookie'
	];
	export const hasArt = (name: string) => bespoke.includes(name);
	/** In the mixed placement these drawings sit inline, right after the heading text. */
	const inlinePlaces: Record<string, string> = {
		coffee: '-mt-6 -mb-32 size-52 sm:-mb-40 sm:size-64',
		eggs: '-mt-4 -mb-24 size-44 sm:-mb-32 sm:size-56'
	};
	export const afterText = (name: string) =>
		(theme.menuArt === 'behind' || theme.menuArt === 'all') &&
		theme.artBehind === 'mixed' &&
		name in inlinePlaces;
</script>

<script lang="ts">
	import { drawOn } from '$lib/motion/draw';
	import CategoryIcon from './CategoryIcon.svelte';

	/**
	 * Line drawings for the full menu page, keyed like CategoryIcon. Six categories have
	 * bespoke drawings (eggs, pancakes, pizza, coffee, juice, cake); the rest reuse the
	 * small icon, scaled, when the Theme lab asks for art on every category.
	 * Style, motion and coverage come from the Theme lab (theme.menuArt / artStyle / artMotion).
	 */
	/** inline: rendered inside the heading row, after the text, instead of absolutely positioned. */
	let { name, inline = false }: { name: string; inline?: boolean } = $props();

	const has = $derived(hasArt(name));
	const watermark = $derived(theme.menuArt === 'behind' || theme.menuArt === 'all');
	/** beside: drawing next to the heading. behind / all: dimmed watermark behind the list. */
	const show = $derived(theme.menuArt === 'all' || (theme.menuArt !== 'off' && has));
	/** Theme lab → Behind: size and side of the watermark. 'mixed' lets each drawing pick. */
	const places = {
		right: 'right-0 top-10 size-40 sm:size-52',
		big: '-right-2 top-4 size-56 sm:size-72',
		left: '-left-8 top-12 size-32 sm:-left-12 sm:size-40'
	};
	const place = $derived(
		inline ? inlinePlaces[name] : places[theme.artBehind === 'mixed' ? 'right' : theme.artBehind]
	);

	let drawn = $state(false);
	let inView = $state(false);
	const report = (d: boolean, v: boolean) => {
		drawn = d;
		inView = v;
	};
</script>

{#if show}
	<div
		use:drawOn={report}
		data-drawn={drawn ? '' : undefined}
		data-in={inView ? '' : undefined}
		aria-hidden="true"
		class={[
			'art no-print pointer-events-none select-none',
			inline ? 'relative shrink-0' : 'absolute',
			watermark ? ['watermark', place] : '-top-3 right-0 size-24 sm:size-28',
			theme.artStyle,
			theme.artMotion
		]}
	>
		{#if has}
			<svg viewBox="0 0 120 120" fill="none" stroke-linecap="round" stroke-linejoin="round">
				{#if name === 'eggs'}
					<!-- a fried egg on a plate -->
					<circle cx="60" cy="60" r="46" />
					<circle cx="60" cy="60" r="37" opacity="0.5" />
					<path class="fill white" d="M40 50c-5 9-8 20 3 25s25 3 31-5 3-19-7-23-21-6-27 3z" />
					<circle class="fill yolk loop-wobble" cx="57" cy="60" r="8.5" />
					<path d="M53 57c1-1.5 3-2.5 5-2.5" opacity="0.6" />
					<path d="M86 52c2 3 2 6 0 9M90 48c3 4 3 10 0 15" opacity="0.5" />
				{:else if name === 'pancakes'}
					<!-- stack of three, butter, syrup -->
					<ellipse cx="60" cy="93" rx="48" ry="7" />
					<ellipse class="fill cake" cx="60" cy="52" rx="34" ry="9" />
					<path class="fill cake" d="M26 52v13c0 5 15 9 34 9s34-4 34-9V52" />
					<path class="fill cake" d="M26 65v13c0 5 15 9 34 9s34-4 34-9V65" />
					<path class="fill butter" d="M51 42l16-3 2 8-16 3z" />
					<path class="loop-drip" d="M36 56c4 3 6 7 5 13" />
					<path class="loop-drip d2" d="M82 55c2 4 1 8-2 11" />
				{:else if name === 'sandwich'}
					<!-- side view: bun top, lettuce wave, base -->
					<path class="fill bread" d="M16 50c0-10 10-16 44-16s44 6 44 16H16z" />
					<path
						class="fill basil"
						d="M18 62c6-6 10 6 16 0s10 6 16 0 10 6 16 0 10 6 16 0 10 6 16 0"
					/>
					<path class="fill bread" d="M16 74h88v10H16z" />
				{:else if name === 'cookie'}
					<!-- a whole cookie; every few seconds a bite breaks off and tumbles away, then it is whole again.
					     Body and bite are fill-only shapes; the strokes are separate so the bite edge can appear. -->
					<path
						class="fill bread noline"
						d="M85.5 34.5A36 36 0 1 0 95.9 56.9 13 13 0 0 1 85.5 34.5z"
					/>
					<path d="M85.5 34.5A36 36 0 1 0 95.9 56.9" />
					<path class="loop-edge" d="M95.9 56.9A13 13 0 0 1 85.5 34.5" />
					<path
						class="fill chip"
						d="M44 46a3 3 0 1 0 6 0 3 3 0 1 0-6 0zM70 62a3 3 0 1 0 6 0 3 3 0 1 0-6 0zM50 74a3 3 0 1 0 6 0 3 3 0 1 0-6 0zM62 42a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0zM36 66a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0z"
					/>
					<g class="loop-piece">
						<path
							class="fill bread noline"
							d="M85.5 34.5A36 36 0 0 1 95.9 56.9 13 13 0 0 1 85.5 34.5z"
						/>
						<path d="M85.5 34.5A36 36 0 0 1 95.9 56.9" />
						<path class="loop-edge" d="M95.9 56.9A13 13 0 0 1 85.5 34.5" />
						<path class="fill chip" d="M88 44a2 2 0 1 0 4 0 2 2 0 1 0-4 0z" />
					</g>
				{:else if name === 'pizza'}
					<!-- slice, point down, steam off the crust -->
					<path class="fill cheese" d="M60 110 22 36c22-11 54-11 76 0z" />
					<path class="fill crust" d="M22 36c22-11 54-11 76 0l-3 8c-20-9-50-9-70 0z" />
					<circle class="fill pepperoni" cx="50" cy="56" r="6" />
					<circle class="fill pepperoni" cx="70" cy="64" r="6" />
					<circle class="fill pepperoni" cx="58" cy="80" r="5" />
					<path class="fill basil" d="M66 48c6-4 10-2 10 2s-6 7-10-2z" />
					<path class="loop-steam" d="M46 26c-3-5 3-7 0-13" />
					<path class="loop-steam s2" d="M60 22c-3-5 3-7 0-13" />
					<path class="loop-steam s3" d="M74 26c-3-5 3-7 0-13" />
				{:else if name === 'coffee'}
					<!-- a ceramic cup on its saucer, latte leaf, thick handle -->
					<ellipse class="fill saucer" cx="56" cy="96" rx="42" ry="7" />
					<path d="M30 104h52" opacity="0.5" />
					<path class="fill cup" d="M26 46c2 22 8 36 14 46h32c6-10 12-24 14-46z" />
					<ellipse class="fill foam" cx="56" cy="46" rx="30" ry="9" />
					<path class="fill basil" d="M56 40c-4 3-4 8 0 11 4-3 4-8 0-11z" />
					<path d="M56 40v11" opacity="0.6" />
					<path d="M86 52c12-3 20 4 18 14s-12 14-20 12" />
					<path d="M86 58c7-1 11 3 10 8s-6 8-11 7" opacity="0.6" />
					<path class="loop-steam" d="M46 30c-4-6 4-9 0-16" />
					<path class="loop-steam s2" d="M58 26c-4-6 4-9 0-16" />
					<path class="loop-steam s3" d="M70 30c-4-6 4-9 0-16" />
				{:else if name === 'cooler'}
					<!-- glass with straw, orange half on the rim, bubbles -->
					<path class="fill juice" d="M36 36h48l-5 70H41z" />
					<path d="M39 58h42" opacity="0.5" />
					<path d="M78 8 54 72" />
					<path class="fill orange" d="M26 38a10 10 0 0 1 20 0z" />
					<path d="M36 38v-9M36 38l-6-7M36 38l6-7" opacity="0.7" />
					<path d="M48 66l12-2 2 12-12 2z" opacity="0.6" />
					<circle class="loop-bubble" cx="52" cy="90" r="2.5" />
					<circle class="loop-bubble b2" cx="63" cy="82" r="2" />
					<circle class="loop-bubble b3" cx="71" cy="94" r="1.8" />
				{:else if name === 'cake'}
					<!-- a wedge of layer cake, point towards you, cream on top -->
					<path class="fill cream" d="M34 62 62 26l46 22z" />
					<path class="fill cake" d="M34 62 62 26v40L34 102z" />
					<path class="fill cake" d="M34 62l74-14v40L34 102z" />
					<path d="M34 78 62 42M34 78l74-14" opacity="0.55" />
					<path d="M34 90 62 54M34 90l74-14" opacity="0.55" stroke-dasharray="3 4" />
					<path class="fill cream" d="M60 50c-1-6 3-9 7-8s7 5 5 9" />
					<path d="M12 106h108" />
					<path d="M28 114h76" />
				{/if}
			</svg>
		{:else}
			<!-- The small category icon, scaled through font-size (its width is 1.5em). -->
			<div class="grid size-full place-items-center text-[4.8rem] sm:text-[6.2rem]">
				<CategoryIcon {name} />
			</div>
		{/if}
	</div>
{/if}

<style>
	.art {
		color: var(--sl-ink);
		opacity: 0.75;
	}
	.art.watermark {
		opacity: 0.1;
	}
	.art.watermark.ink {
		opacity: 0.18;
	}
	svg,
	.art :global(svg) {
		width: 100%;
		height: 100%;
		overflow: visible;
		stroke: currentColor;
		stroke-width: 2.4;
	}
	/* Chalk: rough pencil strokes, no colour. */
	.chalk {
		filter: url(#sl-chalk-rough);
	}
	.chalk .fill {
		fill: none;
	}
	/* Ink: clean accent lines over light colour fills. */
	.ink {
		color: var(--sl-accent);
		opacity: 0.9;
	}
	.ink .fill {
		fill-opacity: 0.55;
	}
	.ink .yolk,
	.ink .butter {
		fill: var(--sl-chalk-yellow);
	}
	.ink .white,
	.ink .foam,
	.ink .cream {
		fill: var(--sl-cream);
	}
	.ink .cake,
	.ink .crust {
		fill: color-mix(in oklab, var(--sl-wood) 55%, var(--sl-cream));
	}
	.ink .cup,
	.ink .saucer {
		fill: var(--sl-cream);
	}
	.ink .foam {
		fill: color-mix(in oklab, var(--sl-wood) 45%, var(--sl-cream));
	}
	.noline {
		stroke: none;
	}
	.ink .chip {
		fill: var(--sl-wood);
	}
	.ink .bread {
		fill: color-mix(in oklab, var(--sl-chalk-yellow) 40%, var(--sl-cream));
	}
	.ink .cheese {
		fill: color-mix(in oklab, var(--sl-chalk-yellow) 70%, var(--sl-cream));
	}
	.ink .pepperoni {
		fill: var(--sl-brick);
	}
	.ink .basil {
		fill: var(--sl-leaf);
	}
	.ink .juice,
	.ink .orange {
		fill: var(--sl-sunset-from);
	}

	/* Draw on: every shape starts invisible and strokes in, staggered, once the section is in view. */
	.draw :global(:is(path, circle, ellipse, line)) {
		stroke-dasharray: var(--len, 1);
		stroke-dashoffset: var(--len, 1);
	}
	.draw :global(.fill) {
		fill-opacity: 0;
	}
	.draw[data-drawn] :global(:is(path, circle, ellipse, line)) {
		animation: sl-draw 0.9s cubic-bezier(0.3, 0, 0.2, 1) forwards;
		animation-delay: calc(var(--i, 0) * 110ms);
	}
	.draw.ink[data-drawn] :global(.fill) {
		animation:
			sl-draw 0.9s cubic-bezier(0.3, 0, 0.2, 1) forwards,
			sl-fill 0.8s ease-out forwards;
		animation-delay: calc(var(--i, 0) * 110ms), calc(var(--i, 0) * 110ms + 0.6s);
	}
	@keyframes sl-draw {
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes sl-fill {
		to {
			fill-opacity: 0.55;
		}
	}

	/* Small loops. In draw mode they start after the drawing has finished; paused off-screen. */
	.art :global(.loop-steam),
	.art :global(.loop-bubble),
	.art :global(.loop-drip),
	.art :global(.loop-wobble),
	.art :global(.loop-piece),
	.art :global(.loop-edge) {
		transform-box: fill-box;
		transform-origin: center;
		animation-play-state: paused;
	}
	.art[data-in] :global(.loop-steam),
	.art[data-in] :global(.loop-bubble),
	.art[data-in] :global(.loop-drip),
	.art[data-in] :global(.loop-wobble),
	.art[data-in] :global(.loop-piece),
	.art[data-in] :global(.loop-edge) {
		animation-play-state: running;
	}
	/* Cookie: the bite (a group) tumbles off; its inner edge and the notch it leaves show only once bitten. */
	.loop :global(.loop-piece),
	.draw[data-drawn] :global(.loop-piece) {
		animation: sl-bite-piece 5.5s ease-in infinite;
	}
	.draw[data-drawn] :global(.loop-piece) {
		animation-delay: 1.8s;
	}
	.loop :global(.loop-edge),
	.draw[data-drawn] :global(.loop-edge) {
		animation-name: sl-draw, sl-bite-edge;
		animation-duration: 0.9s, 5.5s;
		animation-iteration-count: 1, infinite;
		animation-fill-mode: forwards, backwards;
		animation-timing-function: ease-out, linear;
	}
	.draw[data-drawn] :global(.loop-edge) {
		animation-delay: calc(var(--i, 0) * 110ms), 1.8s;
	}
	.loop :global(.loop-steam),
	.draw[data-drawn] :global(.loop-steam) {
		animation-name: sl-draw, sl-steam;
		animation-duration: 0.9s, 3s;
		animation-iteration-count: 1, infinite;
		animation-fill-mode: forwards, none;
		animation-timing-function: ease-out, ease-in-out;
	}
	.loop :global(.loop-bubble),
	.draw[data-drawn] :global(.loop-bubble) {
		animation-name: sl-draw, sl-bubble;
		animation-duration: 0.9s, 3.4s;
		animation-iteration-count: 1, infinite;
		animation-fill-mode: forwards, none;
		animation-timing-function: ease-out, ease-in-out;
	}
	.loop :global(.loop-drip),
	.draw[data-drawn] :global(.loop-drip) {
		animation-name: sl-draw, sl-drip;
		animation-duration: 0.9s, 3.6s;
		animation-iteration-count: 1, infinite;
		animation-fill-mode: forwards, none;
		animation-timing-function: ease-out, ease-in-out;
		transform-origin: top;
	}
	.loop :global(.loop-wobble),
	.draw[data-drawn] :global(.loop-wobble) {
		animation-name: sl-draw, sl-wobble;
		animation-duration: 0.9s, 2.8s;
		animation-iteration-count: 1, infinite;
		animation-fill-mode: forwards, none;
		animation-timing-function: ease-out, ease-in-out;
	}
	/* The loop starts after the whole drawing is on; longest stagger is ~12 shapes. */
	.draw[data-drawn] :global(:is(.loop-steam, .loop-bubble, .loop-drip, .loop-wobble)) {
		animation-delay: calc(var(--i, 0) * 110ms), 1.8s;
	}
	.loop :global(.s2),
	.draw[data-drawn] :global(.s2) {
		animation-delay: calc(var(--i, 0) * 110ms), 0.8s;
	}
	.loop :global(.s3),
	.draw[data-drawn] :global(.s3) {
		animation-delay: calc(var(--i, 0) * 110ms), 1.6s;
	}
	.loop :global(.b2),
	.draw[data-drawn] :global(.b2) {
		animation-delay: calc(var(--i, 0) * 110ms), 1.1s;
	}
	.loop :global(.b3),
	.draw[data-drawn] :global(.b3) {
		animation-delay: calc(var(--i, 0) * 110ms), 2.2s;
	}
	.loop :global(.d2),
	.draw[data-drawn] :global(.d2) {
		animation-delay: calc(var(--i, 0) * 110ms), 1.4s;
	}
	/* Filled shapes that also wobble (yolk, berry) in ink + draw: draw, fill, then wobble. */
	.draw.ink[data-drawn] :global(.fill.loop-wobble) {
		animation-name: sl-draw, sl-fill, sl-wobble;
		animation-duration: 0.9s, 0.8s, 2.8s;
		animation-iteration-count: 1, 1, infinite;
		animation-fill-mode: forwards, forwards, none;
		animation-timing-function: ease-out, ease-out, ease-in-out;
		animation-delay: calc(var(--i, 0) * 110ms), calc(var(--i, 0) * 110ms + 0.6s), 1.8s;
	}
	/* Loop-only mode: the small icon's own steam/bubble animations keep running; nothing to draw. */
	.loop :global(:is(path, circle, ellipse, line)) {
		stroke-dasharray: none;
	}
	@keyframes sl-steam {
		0%,
		100% {
			opacity: 0.3;
			transform: translateY(0);
		}
		50% {
			opacity: 1;
			transform: translateY(-4px);
		}
	}
	@keyframes sl-bubble {
		0% {
			opacity: 0;
			transform: translateY(6px);
		}
		35%,
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translateY(-14px);
		}
	}
	@keyframes sl-drip {
		0%,
		55%,
		100% {
			transform: scaleY(0.5);
		}
		80% {
			transform: scaleY(1.3);
		}
	}
	@keyframes sl-bite-piece {
		0%,
		40% {
			transform: none;
			opacity: 1;
		}
		43% {
			transform: translate(2px, -1px) rotate(-4deg);
		}
		70% {
			transform: translate(10px, 44px) rotate(32deg);
			opacity: 1;
		}
		78%,
		88% {
			transform: translate(12px, 58px) rotate(40deg);
			opacity: 0;
		}
		89% {
			transform: none;
			opacity: 0;
		}
		100% {
			transform: none;
			opacity: 1;
		}
	}
	@keyframes sl-bite-edge {
		0%,
		41% {
			opacity: 0;
		}
		43%,
		86% {
			opacity: 1;
		}
		92%,
		100% {
			opacity: 0;
		}
	}
	@keyframes sl-wobble {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.08) translateY(-1px);
		}
	}
	/* Still, or reduced motion: everything on at once, nothing moves. */
	.still :global(*),
	.still :global(.fill) {
		animation: none !important;
		stroke-dasharray: none;
	}
	.still.ink :global(.fill) {
		fill-opacity: 0.55;
	}
	.still :global(.loop-edge) {
		opacity: 0;
	}
	@media (prefers-reduced-motion: reduce) {
		.art :global(*) {
			animation: none !important;
			stroke-dasharray: none;
		}
		.art.ink :global(.fill) {
			fill-opacity: 0.55;
		}
		.art :global(.loop-edge) {
			opacity: 0;
		}
	}
</style>
