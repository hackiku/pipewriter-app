<!-- src/lib/pages/space/Products.svelte -->
<script lang="ts">
  import { Plane, Stars, Code, ExternalLink } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  
  const products = [
    {
      title: "6Pack",
      description: "Open-source portable flight instrument suite for pilots and their cats. Arduino + React Native magic.",
      icon: Plane,
      status: "Early Alpha",
      link: "https://6pack.cc",
      image: "/api/placeholder/800/400" // For demo, using placeholder API
    },
    {
      title: "SpaceFOMO",
      description: "AI-powered news aggregator for the space industry, with FOMO scoring for trending topics.",
      icon: Stars,
      status: "Coming Soon",
      link: "#",
      image: "/api/placeholder/800/400"
    },
    {
      title: "Wing Designer",
      description: "3D wing design tool for aerospace engineers. Parametric modeling made simple.",
      icon: Code,
      status: "In Development",
      link: "#",
      image: "/api/placeholder/800/400"
    }
  ];
</script>

<div class="container">
  <h2 class="text-3xl font-semibold mb-16">More from the Hangar</h2>
  
  <div class="grid md:grid-cols-3 gap-8">
    {#each products as product}
      <div class="group relative rounded-xl border bg-card overflow-hidden">
        <!-- Image Container -->
        <div class="aspect-[2/1] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            class="w-full h-full object-cover transition-transform duration-300
                   group-hover:scale-105"
          />
        </div>
        
        <!-- Content -->
        <div class="p-6">
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="w-12 h-12 rounded-lg bg-primary/10 
                        flex items-center justify-center shrink-0">
              <svelte:component 
                this={product.icon} 
                class="w-6 h-6 text-primary" 
              />
            </div>
            
            <span class="inline-block px-2 py-1 text-xs rounded-full 
                         bg-muted text-muted-foreground">
              {product.status}
            </span>
          </div>
          
          <h3 class="text-xl font-semibold mb-2">{product.title}</h3>
          <p class="text-muted-foreground mb-6">{product.description}</p>
          
          <Button 
            href={product.link}
            variant="secondary"
            class="w-full group/button"
          >
            <span class="inline-flex items-center gap-2">
              Visit Site
              <ExternalLink 
                class="w-4 h-4 transition-transform duration-200
                       group-hover/button:translate-x-1" 
              />
            </span>
          </Button>
        </div>
      </div>
    {/each}
  </div>
</div>