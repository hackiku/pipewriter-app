<!-- src/lib/pages/pricing/sections/store/TemplateStore.svelte -->
<script lang="ts">
  import { ArrowRight, Download, Star } from "lucide-svelte";
  
  const templateBundles = [
    {
      id: 'saas',
      name: 'SaaS Landing Pages',
      description: '15 complete SaaS wireframes',
      price: 29,
      elements: '45+ elements',
      image: '📱',
      popular: false
    },
    {
      id: 'ecommerce', 
      name: 'eCommerce Bundle',
      description: '20 product & checkout flows',
      price: 39,
      elements: '60+ elements', 
      image: '🛒',
      popular: true
    },
    {
      id: 'agency',
      name: 'Agency Starter Pack',
      description: '25 client-ready templates',
      price: 79,
      elements: '100+ elements',
      image: '🎯', 
      popular: false
    }
  ];
</script>

<div class="container mx-auto">
  
  <!-- Template Grid -->
  <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
    {#each templateBundles as bundle}
      <div class="relative group">
        
        <!-- Popular Badge -->
        {#if bundle.popular}
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <div class="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                        bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white">
              <Star class="w-3 h-3" />
              Best Value
            </div>
          </div>
        {/if}

        <!-- Card -->
        <div class="p-8 rounded-2xl border bg-card h-full flex flex-col
                    {bundle.popular ? 'border-primary/20 shadow-lg' : 'border-border hover:border-primary/20'}
                    transition-all duration-300 group-hover:shadow-lg">
          
          <!-- Icon & Title -->
          <div class="text-center mb-6">
            <div class="text-4xl mb-4">{bundle.image}</div>
            <h3 class="text-xl font-semibold mb-2">{bundle.name}</h3>
            <p class="text-muted-foreground">{bundle.description}</p>
          </div>

          <!-- Stats -->
          <div class="flex-grow space-y-3 mb-6">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Elements</span>
              <span class="font-medium">{bundle.elements}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Lifetime Access</span>
              <span class="text-green-600">✓</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Commercial License</span>
              <span class="text-green-600">✓</span>
            </div>
          </div>

          <!-- Price & CTA -->
          <div class="text-center space-y-4">
            <div class="text-3xl font-bold">${bundle.price}</div>
            <button class="w-full py-3 rounded-lg border
                         {bundle.popular 
                           ? 'bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white hover:shadow-lg'
                           : 'hover:bg-muted'} 
                         transition-all">
              Coming Soon
            </button>
          </div>
          
        </div>
      </div>
    {/each}
  </div>

  <!-- Store CTA -->
  <div class="text-center p-8 rounded-2xl border bg-card max-w-3xl mx-auto">
    <h3 class="text-xl font-semibold mb-4">
      Want early access to premium templates?
    </h3>
    <p class="text-muted-foreground mb-6">
      Join our waitlist and get notified when the template store launches.
      Early subscribers get 50% off their first bundle.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
      <input 
        type="email" 
        placeholder="your@email.com"
        class="flex-1 px-4 py-3 rounded-lg border bg-background"
      />
      <button class="px-6 py-3 rounded-lg bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
                     text-white hover:shadow-lg transition-all font-medium">
        Join Waitlist
      </button>
    </div>
  </div>
  
</div>