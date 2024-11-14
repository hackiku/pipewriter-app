<script lang="ts">
    import Frame from '$lib/iframe/Frame.svelte';
    import { onMount } from 'svelte';
    
    let frameWidth = 300;
</script>

<div class="absolute right-0 overflow-hidden" style="width: 300px; height: 100vh;">
    <!-- Wrap Frame in a container with a clip path to simulate the limited viewport -->
    <div class="relative " style="width: 100vw; clip-path: inset(0 calc(100vw - 300px) 0 0);">
        <svelte:component this={Frame} />
    </div>
</div>