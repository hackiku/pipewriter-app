<!-- // src/routes/work/redocly/+page.svelte -->

<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight, ExternalLink } from "lucide-svelte";
  import { tools } from "$lib/data/assets/tools";
  
  const timeline = [
    {
      phase: "Discovery & Planning",
      tool: tools.pipewriter,
      description: "Used Pipewriter to rapidly wireframe content structures and user flows for the new marketing site.",
      detail: "The wireframes helped align stakeholders on information architecture and content strategy before any pixel work."
    },
    {
      phase: "Design Collaboration",
      tool: tools.figma,
      description: "Worked with the design team to refine wireframes into high-fidelity mockups.",
      detail: "Content-first approach meant designs were built around actual copy, not lorem ipsum."
    },
    {
      phase: "Implementation",
      tool: tools.mdx,
      description: "Collaborated with dev team on content architecture in MDX.",
      detail: "Maintained writer-friendly workflow while meeting technical requirements."
    }
  ];
</script>

<Nav />

<main class="bg-background text-foreground">
  <!-- Hero -->
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
            {#each Object.values(tools) as tool}
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

  <!-- Process Timeline -->
  <section class="container py-24">
    <div class="max-w-2xl">
      <h2 class="text-3xl font-bold mb-12">The Process</h2>
      
      <div class="space-y-16">
        {#each timeline as { phase, tool, description, detail }, i}
          <div class="relative pl-8 border-l">
            <div class="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-foreground" />
            
            <div class="space-y-4">
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
            </div>
          </div>
        {/each}
      </div>
    </div>
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