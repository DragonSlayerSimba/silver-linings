<script lang="ts">
	import config from '$config';
	import NotFound from '$lib/components/NotFound.svelte';

	// Rendered to build/404.html, which GitHub Pages and Cloudflare serve for unknown paths.
</script>

<svelte:head>
	<title>Not found · {config.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<NotFound />
