<!-- src/lib/pages/pricing/sections/TemplateStore.svelte -->
<script lang="ts">
  import { ArrowRight, Download, Star, ExternalLink } from "lucide-svelte";
  import * as Card from "$lib/components/ui/card";
  import { templateBundles } from '../data/store';
  
  // Show first 3 bundles for pricing page preview
  const previewBundles = templateBundles.slice(0, 3);
</script>

<div class="container mx-auto">
  
  <!-- Template Grid -->
  <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
    {#each previewBundles as bundle}
      <div class="relative group">
        
        <!-- Popular Badge -->
        {#if bundle.popular}
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div class="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                        bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white shadow-lg">
              <Star class="w-3 h-3" />
              Best Value
            </div>
          </div>
        {/if}

        <!-- Card -->
        <Card.Root class="overflow-hidden border-2 hover:border-primary/20 
                         transition-all duration-300 group-hover:shadow-xl h-full
                         {bundle.popular ? 'border-primary/20 shadow-lg' : ''}">
          
          <!-- Cover Image -->
          <div class="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 
                      relative overflow-hidden">
            <!-- Placeholder cover with emoji -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-6xl">{bundle.image}</div>
            </div>
            <!-- Grid pattern overlay -->
            <div class="absolute inset-0 bg-grid-pattern opacity-20"></div>
          </div>
          
          <Card.Content class="p-6 h-full flex flex-col">
            <!-- Header -->
            <div class="mb-4">
              <Card.Title class="text-xl font-semibold mb-2">{bundle.name}</Card.Title>
              <Card.Description class="text-muted-foreground">
                {bundle.description}
              </Card.Description>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              {#each bundle.tags.slice(0, 2) as tag}
                <span class="px-2 py-1 text-xs font-medium rounded-md 
                           bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              {/each}
            </div>

            <!-- Stats -->
            <div class="flex-grow space-y-3 mb-6">
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">Elements</span>
                <span class="font-medium">{bundle.elements}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">Lifetime Access</span>
                <span class="text-green-600 font-medium">✓</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">Commercial License</span>
                <span class="text-green-600 font-medium">✓</span>
              </div>
            </div>

            <!-- Price & CTA -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <div class="text-3xl font-bold">${bundle.price}</div>
                {#if bundle.originalPrice}
                  <div class="text-lg text-muted-foreground line-through">
                    ${bundle.originalPrice}
                  </div>
                {/if}
              </div>
              
              <button class="w-full py-3 rounded-lg border font-medium
                           {bundle.popular 
                             ? 'bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white hover:shadow-lg border-transparent'
                             : 'hover:bg-muted border-border'} 
                           transition-all">
                Coming Soon
              </button>
            </div>
            
          </Card.Content>
        </Card.Root>
      </div>
    {/each}
  </div>

  <!-- Enhanced Store CTA -->
  <div class="relative max-w-4xl mx-auto">
    <!-- Background gradient -->
    <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 -z-10"></div>
    <div class="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl"></div>
    
    <div class="relative p-12 space-y-8 text-center">
      <div class="space-y-4">
        <h3 class="text-3xl font-semibold">Want Early Access to Premium Templates?</h3>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Join our waitlist and get notified when the template store launches.
          Early subscribers get <span class="font-semibold text-primary">50% off</span> their first bundle.
        </p>
      </div>
      
      <!-- Email signup with store link -->
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="your@email.com"
            class="flex-1 px-6 py-4 rounded-xl border border-border bg-background 
                   focus:ring-2 focus:ring-primary focus:border-transparent
                   transition-all"
          />
          <button class="px-8 py-4 rounded-xl bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
                         text-white hover:shadow-xl hover:shadow-primary/20 transition-all font-medium">
            Join Waitlist
          </button>
        </div>
        
        <!-- Store link -->
        <div class="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>Or</span>
          <a href="/store" 
             class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border
                    hover:bg-muted hover:border-primary/20 transition-all font-medium">
            <span>Browse Template Store</span>
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <p class="text-sm text-muted-foreground">
        🎯 Professional templates used on $5K-10K projects • ✨ Light & dark mode versions
      </p>
    </div>
  </div>
  
</div>

<style>
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgb(209 213 219 / 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(209 213 219 / 0.1) 1px, transparent 1px);
    background-size: 2rem 2rem;
  }
</style>