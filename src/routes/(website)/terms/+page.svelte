<!-- src/routes/(website)/terms/+page.svelte -->
<script lang="ts">
	import LegalPage from '$lib/pages/legal/LegalPage.svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.policy.title}</title>
	<meta name="description" content="Terms of service for our website and services." />
</svelte:head>

<LegalPage policy={data.policy} />