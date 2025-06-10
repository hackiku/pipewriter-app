<!-- src/lib/pages/pricing/sections/benefits/Benefits.svelte -->
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
        image: "/people/writers/giorgi-chkoidze.png"
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
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svelte:component this={benefit.icon} class="w-6 h-6 text-primary" />
            </div>
            <span class="px-3 py-1 text-sm font-medium rounded-full
                         bg-primary/10 text-primary border border-primary/20">
              {benefit.badge}
            </span>
          </div>
          
          <!-- Title & Description -->
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-semibold leading-tight">
              {benefit.title}
            </h3>
            <p class="text-xl text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </div>
          
          <!-- Testimonial Card -->
          <div class="relative p-6 rounded-xl border bg-card/50 backdrop-blur-sm">
            <blockquote class="text-lg font-medium mb-4 text-muted-foreground">
              "{benefit.testimonial.quote}"
            </blockquote>
            <div class="flex items-center gap-3">
              <img 
                src={benefit.testimonial.image} 
                alt={benefit.testimonial.author}
                class="w-10 h-10 rounded-full"
              />
              <div>
                <div class="font-medium">{benefit.testimonial.author}</div>
                <div class="text-sm text-muted-foreground">{benefit.testimonial.role}</div>
              </div>
            </div>
          </div>
          
        </div>
        
        <!-- Visual -->
        <div class="relative {benefit.align === 'right' ? 'lg:order-1' : ''}">
          <div class="aspect-square rounded-2xl 
                      bg-gradient-to-br from-primary/5 to-primary/10
                      border border-primary/10 overflow-hidden
                      flex items-center justify-center">
            
            <!-- Placeholder for future demos/screenshots -->
            <div class="text-center space-y-4 p-8">
              <svelte:component this={benefit.icon} class="w-16 h-16 text-primary/30 mx-auto" />
              <div class="text-sm text-muted-foreground">
                {benefit.badge} Preview
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    {/each}
  </div>
  
</div>