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


<img src="/fun/privacy-2.webp"
	alt="objection penguin gif"
	class="-z-10 absolute rotate-6 rounded-xl 
	w-32 top-52 right-8 md:top-32 md:right-12 md:w-60 lg:right-64"
/>