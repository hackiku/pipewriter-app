<!-- src/lib/pages/space/content/Problem.svelte -->

<!-- $lib/pages/layout/Problem.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { XCircle, CheckCircle } from 'lucide-svelte';

    const images = [
        { 
            x: '10%', y: '10%', size: 'lg',
            issues: ['5s load time', 'Generic template'],
            wins: []
        },
        { 
            x: '60%', y: '5%', size: 'sm',
            issues: ['Poor mobile UX'],
            wins: ['Clean code']
        },
        { 
            x: '80%', y: '30%', size: 'md',
            issues: [],
            wins: ['3x conversions', 'Modern stack']
        },
        // Add more as needed
    ];

    let scrollY = 0;
    let container: HTMLElement;

    onMount(() => {
        window.addEventListener('scroll', () => {
            if (container) {
                const rect = container.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    scrollY = window.scrollY;
                }
            }
        });
    });
</script>

<div class="min-h-[120vh] relative" bind:this={container}>
    <!-- Floating Images -->
    {#each images as img}
        <div class="absolute" 
             style="left: {img.x}; top: {img.y}; 
                    transform: translateY({scrollY * 0.1}px)">
            <!-- Image Placeholder -->
            <div class="relative rounded-xl bg-muted overflow-hidden
                        {img.size === 'lg' ? 'w-96 h-64' : 
                         img.size === 'md' ? 'w-72 h-48' : 'w-48 h-32'}">
                <!-- Pills Container -->
                <div class="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {#each img.issues as issue}
                        <span class="px-2 py-1 rounded-full text-xs
                                   bg-destructive/10 text-destructive 
                                   flex items-center gap-1">
                            <XCircle class="w-3 h-3" />
                            {issue}
                        </span>
                    {/each}
                    {#each img.wins as win}
                        <span class="px-2 py-1 rounded-full text-xs
                                   bg-primary/10 text-primary
                                   flex items-center gap-1">
                            <CheckCircle class="w-3 h-3" />
                            {win}
                        </span>
                    {/each}
                </div>
            </div>
        </div>
    {/each}

    <!-- Fixed Text in Center -->
    <div class="sticky top-1/3 max-w-xl mx-auto text-center z-10">
        <h2 class="text-4xl font-medium leading-snug">
            Your rockets are cutting-edge.
            Your website is from 1969. Let's fix that with the
						Power of UX.
        </h2>
    </div>
</div>