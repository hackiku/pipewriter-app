<!-- /Users/jzro/gPipe/webapp/src/routes/(website)/+page.svelte -->
<!-- // src/routes/work/pipewriter/+page.svelte -->

<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ChevronDown, ExternalLink } from "lucide-svelte";
  
  let stats = [
    { value: "87+", label: "UI components delivered" },
    { value: "100%", label: "in Google Docs" },
    { value: "10x", label: "faster wireframing" },
    { value: "2", label: "happy clients already" }
  ];
</script>

<Nav />

<main class="bg-background text-foreground">
  <!-- {/* Hero */} -->
  <section class="relative h-[90vh] flex items-center">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background">
      <img 
        src="/work/pipewriter/hero.jpg" 
        alt="Pipewriter in action"
        class="w-full h-full object-cover opacity-40"
      />
    </div>
    
    <div class="container relative z-10 pt-20">
      <div class="flex flex-col max-w-4xl gap-6">
        <div class="inline-flex h-6 items-center rounded-full border px-3 text-xs font-mono bg-muted/50">
          case study
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold">
          How I Built Figma for Writers
          <span class="text-muted-foreground">(in Google Docs)</span>
        </h1>
        <p class="text-xl text-muted-foreground">
          From wireframing my own landing pages to launching a product that helps writers design without leaving their favorite editor
        </p>
      </div>
    </div>
    
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown size={32} class="text-muted-foreground" />
    </div>
  </section>

  <!-- {/* Key Stats */} -->
  <section class="container py-24">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each stats as { value, label }}
        <div class="flex flex-col items-center text-center p-6 rounded-lg bg-muted/5">
          <span class="text-4xl font-bold mb-2">{value}</span>
          <span class="text-muted-foreground">{label}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- {/* The Story */} -->
  <section class="container py-24">
    <div class="grid lg:grid-cols-2 gap-24">
      <div class="space-y-6">
        <h2 class="text-3xl font-bold">The Origin Story</h2>
        <p class="text-muted-foreground leading-relaxed">
          As a UX writer crafting landing pages, I found myself caught between Google Docs 
          (where writers live) and Figma (where designers thrive). The constant context 
          switching was killing my flow. So I asked: what if we brought design tools to 
          where the writing happens?
        </p>
      </div>

      <div class="relative h-[400px] rounded-lg overflow-hidden">
        <img 
          src="/work/pipewriter/process.jpg" 
          alt="Early Pipewriter sketches"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </section>

  <!-- {/* Process */} -->
  <section class="container py-24">
    <h2 class="text-3xl font-bold mb-16">The Build Process</h2>
    
    <div class="space-y-32">
      <div class="grid lg:grid-cols-2 gap-16">
        <div>
          <h3 class="text-2xl font-semibold mb-6">1. Wireframing in Pipewriter</h3>
          <p class="text-muted-foreground leading-relaxed">
            I used the first version of Pipewriter to wireframe its own landing page - 
            a meta approach that helped validate the core concept. Each iteration got 
            faster as I refined the component library.
          </p>
        </div>
        
        <div class="relative h-[300px] rounded-lg overflow-hidden bg-muted">
          <img 
            src="/work/pipewriter/wireframes.jpg"
            alt="Pipewriter wireframes"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-16">
        <div class="order-2 lg:order-1">
          <div class="relative h-[300px] rounded-lg overflow-hidden bg-muted">
            <img 
              src="/work/pipewriter/figma.jpg"
              alt="Figma refinements"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <div class="order-1 lg:order-2">
          <h3 class="text-2xl font-semibold mb-6">2. Refining in Figma</h3>
          <p class="text-muted-foreground leading-relaxed">
            Collaborated with designers to elevate the visual language while keeping 
            the core promise: everything must be doable in Google Docs. This constraint 
            drove innovative solutions for complex UI patterns.
          </p>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-16">
        <div>
          <h3 class="text-2xl font-semibold mb-6">3. Prototyping Interactions</h3>
          <p class="text-muted-foreground leading-relaxed">
            Built rapid prototypes in Next.js to validate key interactions. These demos 
            helped the dev team understand the vision and identify potential technical 
            challenges early.
          </p>
        </div>
        
        <div class="relative h-[300px] rounded-lg overflow-hidden bg-muted">
          <img 
            src="/work/pipewriter/prototype.jpg"
            alt="Interactive prototypes"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- {/* Results & Next Steps */} -->
  <section class="container py-24">
    <div class="max-w-2xl mx-auto text-center space-y-8">
      <h2 class="text-3xl font-bold">Launch & Beyond</h2>
      <p class="text-muted-foreground leading-relaxed">
        Within the first week of beta launch, Pipewriter found its first paying customers 
        and sparked exciting conversations about the future of content-first design tools.
      </p>
      
      <div class="flex justify-center gap-4">
        <Button variant="default" asChild>
          <a href="https://pipewriter.io" class="inline-flex items-center">
            Visit Pipewriter
            <ExternalLink class="ml-2 h-4 w-4" />
          </a>
        </Button>
        
        <Button variant="outline" asChild>
          <a href="/work" class="inline-flex items-center">
            View More Work
          </a>
        </Button>
      </div>
    </div>
  </section>
</main>

