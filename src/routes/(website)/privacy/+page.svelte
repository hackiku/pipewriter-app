<!-- src/routes/(website)/privacy/+page.svelte -->
<script lang="ts">
	import LegalPage from '$lib/pages/legal/LegalPage.svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.policy.title}</title>
	<meta name="description" content="Privacy policy for our website and services." />
</svelte:head>

<LegalPage policy={data.policy} />