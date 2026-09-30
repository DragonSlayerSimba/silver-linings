<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import config from '$config';
	import { hoursLabel, closedDaysLabel, telHref } from '$lib/utils';

	const { contact, hours } = config;
</script>

<Section id="find-us" eyebrow="Storm passes, coffee stays" title="Find us">
	<div class="grid gap-10 sm:grid-cols-2">
		<div class="space-y-4">
			<address class="not-italic">
				{#each contact.address.lines as line (line)}<p>{line}</p>{/each}
				{#if contact.address.landmark}<p class="text-ink/60">{contact.address.landmark}</p>{/if}
			</address>
			<p>
				<a class="text-accent underline" href={telHref(contact.phone)}>{contact.phone}</a>
				{#if contact.whatsapp}
					· <a class="text-accent underline" href={`https://wa.me/${contact.whatsapp}`}>WhatsApp</a>
				{/if}
			</p>
			{#if contact.address.mapsUrl}
				<a
					class="inline-block rounded-full bg-accent px-5 py-2 text-cream"
					href={contact.address.mapsUrl}
				>
					Open in Maps
				</a>
			{/if}
		</div>
		<div>
			<p class="text-xs tracking-[0.2em] text-ink/50 uppercase">Hours</p>
			<p class="mt-1 text-2xl">{hoursLabel()}</p>
			<p class="text-ink/70">{hours.note ?? closedDaysLabel()}</p>
		</div>
	</div>
</Section>
