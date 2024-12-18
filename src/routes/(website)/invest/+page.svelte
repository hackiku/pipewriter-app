<!-- routes/(website)/invest/+page.svelte -->
<script lang="ts">
  import { Sparkles, TrendingUp, Users, Code, Rocket } from "lucide-svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import EarlyAccess from "$lib/components/cta/EarlyAccess.svelte";
  import EarlyAccessDrawer from "$lib/components/cta/EarlyAccessDrawer.svelte";
</script>

<main class="bg-background text-foreground">
  <!-- Hero Section -->
  <section class="relative min-h-[80vh] flex items-center justify-center">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>

    <div class="container relative z-10 py-20">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Investment Badge -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-8 
                    rounded-full bg-primary/10 text-primary border border-primary/20">
          <TrendingUp class="w-4 h-4" />
          <span class="text-sm font-medium">Early Investor Opportunity</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6">
          Invest $20k in the<br />Future of UX Writing
        </h1>
        <p class="text-xl sm:text-2xl text-muted-foreground mb-8">
          Seeking $20k investment to scale our profitable B2B SaaS
        </p>

        <!-- Hero CTA -->
        <a 
          href="mailto:ivan@pipewriter.io"
          class="inline-flex items-center gap-2 px-6 py-3 
                 bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
                 text-white font-medium rounded-lg
                 hover:opacity-90 transition-opacity"
        >
          Contact Founder
        </a>
      </div>
    </div>
  </section>

  <!-- Metrics Section -->
  <section class="py-32 bg-background relative">
    <div class="container">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="p-6 rounded-xl border bg-background/50 backdrop-blur-sm">
          <h3 class="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED]">
            5,000+
          </h3>
          <p class="text-muted-foreground">LinkedIn post impressions</p>
        </div>
        
        <div class="p-6 rounded-xl border bg-background/50 backdrop-blur-sm">
          <h3 class="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED]">
            2
          </h3>
          <p class="text-muted-foreground">Sales with zero marketing spend</p>
        </div>

        <div class="p-6 rounded-xl border bg-background/50 backdrop-blur-sm">
          <h3 class="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED]">
            20%
          </h3>
          <p class="text-muted-foreground">Equity offered for $20k investment</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Opportunity Section -->
  <section class="py-32 bg-background border-t relative">
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>

    <div class="container relative">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-16">
          Why Invest in Pipewriter?
        </h2>

        <div class="space-y-12">
          <!-- Market -->
          <div class="flex gap-6">
            <div class="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
              <Users class="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Growing UX Writing Market</h3>
              <p class="text-muted-foreground">
                Technical writing and UX content roles are exploding. We're positioning 
                to be the go-to tool for this growing professional market.
              </p>
            </div>
          </div>

          <!-- Tech -->
          <div class="flex gap-6">
            <div class="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
              <Code class="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Unique Google Docs Integration</h3>
              <p class="text-muted-foreground">
                Our Google Workspace integration creates a strong technical moat. 
                Writers can use familiar tools while producing professional-grade deliverables.
              </p>
            </div>
          </div>

          <!-- Growth -->
          <div class="flex gap-6">
            <div class="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
              <Rocket class="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Clear Path to $10k MRR</h3>
              <p class="text-muted-foreground">
                With proven initial sales and zero marketing spend, we're ready to scale.
                Investment will fuel our marketing automation and sales systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section class="py-32 bg-background border-t text-center">
    <div class="container">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">Ready to Join Us?</h2>
        <p class="text-xl text-muted-foreground mb-8">
          Get in touch to discuss the opportunity and see our detailed growth plans.
        </p>
        <a 
          href="mailto:ivan@pipewriter.io"
          class="inline-flex items-center gap-2 px-6 py-3 
                 bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
                 text-white font-medium rounded-lg
                 hover:opacity-90 transition-opacity"
        >
          Contact Founder
        </a>
      </div>
    </div>
  </section>
</main>