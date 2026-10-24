<script lang="ts">
	import config from '$config';
	import NotFound from '$lib/components/NotFound.svelte';
</script>

<svelte:head>
	<title>Not found · {config.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<NotFound />
