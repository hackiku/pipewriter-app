<!-- src/lib/(space)/repacks/RepacksPage.svelte -->
<script lang="ts">
  import { Rocket, ArrowRight } from 'lucide-svelte';

  const repacks = [
    {
      id: 'firefly',
      name: 'Firefly Aerospace',
      description: 'Launch vehicles for commercial access to space',
      status: 'in-progress',
      url: '/space/repacks/firefly',
      accentColor: 'from-orange-500/20 to-red-500/20',
      dotColor: 'bg-orange-500/50'
    },
    // More repacks will go here
  ];
</script>

<div class="min-h-full bg-background text-foreground relative py-32 md:py-36">
  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-24 space-y-6">
      <div class="inline-flex items-center gap-1.5 px-3 py-1
                  rounded-full bg-primary/10 text-primary 
                  border border-primary/20 mb-8">
        <Rocket class="w-4 h-4" />
        <span class="text-sm font-medium">Latest Repacks</span>
      </div>

      <h1 class="text-4xl md:text-5xl font-light">
        Landing pages that are truly out of this world
      </h1>
      
      <p class="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
        Explore our showcase of space startup website redesigns, 
        each one crafted with precision and engineered to convert.
      </p>
    </div>

    <!-- Cards Grid -->
    <div class="grid gap-8 max-w-4xl mx-auto">
      {#each repacks as repack}
        <a 
          href={repack.url}
          class="group relative overflow-hidden rounded-xl
                 border border-border/40 hover:border-border
                 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50
                 hover:from-zinc-800/70 hover:to-zinc-900/70
                 backdrop-blur-sm transition-all duration-300"
        >
          <!-- Accent Gradient -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300
                      bg-gradient-to-br {repack.accentColor}" 
          />

          <div class="relative p-8 md:p-12">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 rounded-full {repack.dotColor} 
                           animate-pulse group-hover:animate-none" 
                />
                <p class="text-xl text-foreground font-medium">
                  {repack.name}
                </p>
              </div>

              <div class="flex items-center gap-2 text-muted-foreground 
                          group-hover:text-foreground transition-colors">
                <span class="text-sm">View Redesign</span>
                <ArrowRight class="w-4 h-4 transform translate-x-0 
                                 group-hover:translate-x-1 transition-transform" 
                />
              </div>
            </div>

            <!-- Description -->
            <p class="text-muted-foreground group-hover:text-foreground/90 
                      transition-colors">
              {repack.description}
            </p>

            <!-- Status Tag -->
            <div class="absolute bottom-8 left-8">
              <div class="px-3 py-1 rounded-full text-xs 
                          bg-foreground/5 text-foreground/60
                          border border-foreground/10">
                {repack.status}
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>