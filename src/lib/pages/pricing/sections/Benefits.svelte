<!-- src/lib/pages/pricing/sections/Benefits.svelte -->
<script lang="ts">
  import { FileText, Zap, Users, ArrowRight } from "lucide-svelte";
  
  const benefits = [
    {
      id: 'native',
      icon: FileText,
      badge: 'Native Integration',
      title: 'Wireframe Where You Already Write',
      description: 'No more juggling between Figma, Notion, and endless video calls. Create professional wireframes directly in Google Docs with our sidebar app.',
      testimonial: {
        quote: "I've never seen a tool like this that works natively in Docs. This changes everything for us UX writers.",
        author: "Eoin Cronolly",
        role: "SaaS Copywriter",
        image: "/people/writers/eoin-cronolly.jpeg"
      },
      align: 'left'
    },
    {
      id: 'speed',
      icon: Zap,
      badge: 'Lightning Fast',
      title: 'Click or Enter/Space to Insert',
      description: 'Professional wireframe elements at your fingertips. Build complete landing page wireframes in minutes, not hours.',
      testimonial: {
        quote: "Going from copy doc to a website that's around 90% ready to deploy is the exact thing I've been looking for.",
        author: "Matthew Szymanski", 
        role: "Copywriter & Dev",
        image: "/people/writers/matthew-szymanski.png"
      },
      align: 'right'
    },
    {
      id: 'results',
      icon: Users,
      badge: 'Client Results',
      title: 'Charge More, Revise Less',
      description: 'Professional deliverables that clients understand immediately. Fewer revision rounds, higher project values.',
      testimonial: {
        quote: "Clients immediately get the vision when they see the wireframe structure. Revisions become much easier or they don't even ask.",
        author: "Giorgi C.",
        role: "Freelance Copywriter", 
        image: "/people/writers/giorgi-chkoidze.jpeg"
      },
      align: 'left'
    }
  ];
</script>

<div class="container mx-auto">

  <!-- Benefits Zigzag -->
  <div class="space-y-32 max-w-7xl mx-auto">
    {#each benefits as benefit, i}
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        
        <!-- Content -->
        <div class="space-y-8 {benefit.align === 'right' ? 'lg:order-2' : ''}">
          
          <!-- Badge & Icon -->
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 
                        flex items-center justify-center border border-primary/10">
              <svelte:component this={benefit.icon} class="w-8 h-8 text-primary" />
            </div>
            <span class="px-4 py-2 text-sm font-semibold rounded-full
                         bg-gradient-to-r from-primary/10 to-primary/20 text-primary 
                         border border-primary/20">
              {benefit.badge}
            </span>
          </div>
          
          <!-- Title & Description -->
          <div class="space-y-6">
            <h3 class="text-3xl md:text-4xl font-bold leading-tight">
              {benefit.title}
            </h3>
            <p class="text-xl text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </div>
          
          <!-- Enhanced Testimonial Card -->
          <div class="relative p-8 rounded-2xl border-2 bg-gradient-to-br from-card/80 to-muted/20 
                      backdrop-blur-sm border-primary/10 hover:border-primary/20 
                      transition-all duration-300 hover:shadow-xl">
            <!-- Quote mark -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary/20 mb-4" viewBox="0 0 35 30" fill="currentColor">
              <path d="M22.3838 27.6777C23.5264 28.9961 25.3721 29.6992 27.4814 29.6992C31.6123 29.6992 34.249 26.9746 34.249 22.7559C34.249 18.625 31.5244 15.6367 27.6572 15.6367C26.8662 15.6367 25.9873 15.8125 25.1084 16.0762C24.5811 9.48438 27.833 4.03516 32.2275 2.36523L31.7881 0.871094C24.2295 3.77148 19.4834 11.1543 19.4834 19.8555C19.4834 22.668 20.5381 25.7441 22.3838 27.6777ZM0.499023 19.8555C0.499023 24.6895 3.22363 29.6992 8.49707 29.6992C12.54 29.6992 15.1768 26.9746 15.1768 22.7559C15.1768 18.625 12.4521 15.6367 8.67285 15.6367C7.88184 15.6367 7.00293 15.8125 6.12402 16.0762C5.59668 9.48438 8.84863 4.03516 13.2432 2.36523L12.7158 0.871094C5.24512 3.77148 0.499023 11.1543 0.499023 19.8555Z"/>
            </svg>
            
            <blockquote class="text-md font-medium mb-6 text-foreground leading-relaxed">
              "{benefit.testimonial.quote}"
            </blockquote>
            
            <div class="flex items-center gap-4">
              <img 
                src={benefit.testimonial.image} 
                alt={benefit.testimonial.author}
                class="w-14 h-14 rounded-full ring-2 ring-primary/20"
              />
              <div>
                <div class="font-semibold text-lg text-foreground">{benefit.testimonial.author}</div>
                <div class="text-base text-muted-foreground">{benefit.testimonial.role}</div>
              </div>
            </div>
          </div>
          
        </div>
        
        <!-- Visual -->
        <div class="relative {benefit.align === 'right' ? 'lg:order-1' : ''}">
          <div class="aspect-square rounded-3xl 
                      bg-gradient-to-br from-primary/5 to-primary/15
                      border-2 border-primary/10 overflow-hidden
                      flex items-center justify-center relative
                      hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
            
            <!-- Background pattern -->
            <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
            
            <!-- Content -->
            <div class="text-center space-y-6 p-12 relative z-10">
              <div class="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 
                          flex items-center justify-center">
                <svelte:component this={benefit.icon} class="w-12 h-12 text-primary" />
              </div>
              <div class="text-lg font-medium text-muted-foreground">
                {benefit.badge} Preview
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    {/each}
  </div>
  
</div>

<style>
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgb(209 213 219 / 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(209 213 219 / 0.1) 1px, transparent 1px);
    background-size: 2rem 2rem;
  }
</style>