<!-- src/routes/work/redocly/+page.svelte -->
<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight, ExternalLink } from "lucide-svelte";
  import { tools } from "$lib/data/assets/tools";
  import MasonryGallery from "$lib/components/MasonryGallery.svelte";
  
  const heroTools = [tools.pipewriter, tools.figma, tools.react];
  
  const timeline = [
    {
      phase: "Discovery & Planning",
      tool: tools.pipewriter,
      description: "Used Pipewriter to rapidly wireframe content structures and user flows for the new marketing site.",
      detail: "The wireframes helped align stakeholders on information architecture and content strategy before any pixel work.",
      image: "/work/redocly/discovery.jpg"
    },
    {
      phase: "Design Collaboration",
      tool: tools.figma,
      description: "Worked with the design team to refine wireframes into high-fidelity mockups.",
      detail: "Content-first approach meant designs were built around actual copy, not lorem ipsum.",
      image: "/work/redocly/design.jpg"
    },
    {
      phase: "Implementation",
      tool: tools.mdx,
      description: "Collaborated with dev team on content architecture in MDX.",
      detail: "Maintained writer-friendly workflow while meeting technical requirements.",
      image: "/work/redocly/implementation.jpg"
    }
  ];

  const galleryImages = [
    { src: "/work/redocly/gallery-1.jpg", alt: "Redocly homepage" },
    { src: "/work/redocly/gallery-2.jpg", alt: "Documentation page" },
    { src: "/work/redocly/gallery-3.jpg", alt: "Features section" },
    { src: "/work/redocly/gallery-4.jpg", alt: "API reference" },
    { src: "/work/redocly/gallery-5.jpg", alt: "Developer portal" }
  ];
</script>

<Nav />

<main class="bg-background text-foreground">
<!-- Hero section with only specific tools -->
<section class="relative min-h-[70vh] flex items-center border-b">
  <div class="container relative z-10 pt-20">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="flex flex-col gap-6">
        <div class="space-y-2">
          <div class="inline-flex h-6 items-center rounded-full border px-3 text-xs font-mono bg-muted/50">
            redocly / case study
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold">
            Writing Developer<br/>Experiences
          </h1>
        </div>
        
        <p class="text-xl text-muted-foreground">
          How we transformed Redocly's technical documentation platform into a 
          compelling product story—from wireframes to words.
        </p>

        <div class="flex gap-4 pt-4">
          {#each heroTools as tool}
            <a 
              href={tool.url}
              class="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <img 
                src={tool.icon} 
                alt={tool.name}
                class="w-6 h-6"
                onerror="this.innerText = '{tool.fallback}'"
              />
              {tool.name}
            </a>
          {/each}
        </div>
      </div>

      <div class="relative aspect-square rounded-lg overflow-hidden bg-muted">
        <img 
          src="/work/redocly/hero.jpg" 
          alt="Redocly homepage wireframe"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>

  <!-- New Tools Grid Section -->
  <section class="container py-24 border-b">
    <h2 class="text-3xl font-bold mb-12">Tools & Technologies</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
      {#each Object.values(tools) as tool}
        <a 
          href={tool.url}
          class="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img 
            src={tool.icon} 
            alt={tool.name}
            class="w-12 h-12"
            onerror="this.innerText = '{tool.fallback}'"
          />
          <span class="text-sm font-medium">{tool.name}</span>
        </a>
      {/each}
    </div>
  </section>


  <section class="container py-24">
    <div class="max-w-4xl">
      <h2 class="text-3xl font-bold mb-12">The Process</h2>
      
      <div class="space-y-24">
        {#each timeline as { phase, tool, description, detail, image }, i}
          <div class="relative pl-8 border-l">
            <div class="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-foreground" />
            
            <div class="space-y-8">
              <div class="flex items-center gap-4">
                <h3 class="text-xl font-semibold">{phase}</h3>
                <img 
                  src={tool.icon} 
                  alt={tool.name}
                  class="w-5 h-5"
                  onerror="this.innerText = '{tool.fallback}'"
                />
              </div>
              
              <p class="text-lg">{description}</p>
              <p class="text-muted-foreground">{detail}</p>
              
              <div class="rounded-lg overflow-hidden bg-muted mt-6">
                <img 
                  src={image} 
                  alt={`${phase} phase screenshot`}
                  class="w-full h-auto"
                />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="container py-24 border-t">
    <h2 class="text-3xl font-bold mb-12">Project Gallery</h2>
    <MasonryGallery images={galleryImages} />
  </section>




  <!-- Key Results -->
  <section class="container py-24 border-t">
    <div class="max-w-2xl mx-auto text-center space-y-8">
      <h2 class="text-3xl font-bold">Outcome</h2>
      <p class="text-xl text-muted-foreground leading-relaxed">
        The new Redocly marketing site launched with a clear product story, 
        turning complex technical features into compelling user benefits. 
        Content-first design approach led to faster development and fewer revisions.
      </p>
      
      <div class="pt-8 flex justify-center gap-4">
        <Button asChild>
          <a href="https://redocly.com" class="inline-flex items-center group">
            Visit Redocly
            <ExternalLink class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </div>
  </section>

  <!-- Next Project -->
  <section class="container py-24 border-t">
    <a 
      href="/work/pipewriter"
      class="group flex items-center justify-between hover:text-primary transition-colors"
    >
      <div>
        <p class="text-sm text-muted-foreground mb-2">Next Project</p>
        <h3 class="text-2xl font-bold">Pipewriter: UX Writing Tools</h3>
      </div>
      <ArrowRight class="h-8 w-8 group-hover:translate-x-2 transition-transform"/>
    </a>
  </section>
</main>