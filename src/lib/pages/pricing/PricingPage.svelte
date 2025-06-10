<!-- src/lib/pages/pricing/PricingPage.svelte -->
<script lang="ts">
  import Hero from './sections/Hero.svelte';
  import Plans from './components/plans/Plans.svelte';
  import Benefits from './sections/Benefits.svelte';
  import CompareTable from './components/compare/CompareTable.svelte';
  import TemplateStore from './sections/TemplateStore.svelte';
  import FAQ from './sections/FAQ.svelte';
  import BackgroundGrid from "$lib/components/BackgroundGrid.svelte";
  import SignUpForm from "$lib/components/cta/signin/SignUpForm.svelte";
  import { FileText, Zap, Download, Code, Sparkles, Users, ArrowRight } from "lucide-svelte";
  import { onDestroy } from 'svelte';
  import { pricingStore } from './stores/pricingStore';
  
  export const HEADLINE = "text-[#171717] dark:text-[#CFCFCF]";
  
  // Reset store when leaving page
  onDestroy(() => {
    pricingStore.reset();
  });

</script>

<!-- Background -->
<div class="bg-landing dark:bg-[#040D12] fixed inset-0 min-w-screen min-h-screen overflow-hidden -z-10">
  <BackgroundGrid gridSize="44" speed="10s" opacity="0.3" />
</div>

<!-- <main class="min-h-screen bg-gradient-to-b from-background/90 to-background/95 relative"> -->
  
  <!-- Hero Section -->
  <section class="relative pt-32 pb-16 md:pb-24 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <Hero />
  </section>
  
  <!-- Plans Section -->
  <section class="py-0 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <Plans />
  </section>
  
  <!-- Benefits Section -->
  <section class="py-24 border-t border-border/50 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <div class="text-center mb-20 max-w-3xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight mb-6 {HEADLINE}">
        Built by a Writer,<br>
        <span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] bg-clip-text text-transparent">
          for Writers
        </span>
      </h2>
      <p class="text-xl text-muted-foreground leading-relaxed">
        After 8 years crafting copy for YC startups and Global 500 companies, 
        I built the wireframing tool I always wished existed.
      </p>
    </div>
    
    <Benefits />
  </section>
  
  <!-- Template Store Section -->
  <section class="py-24 bg-muted/20 border-y border-border/50 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <div class="text-center mb-16 max-w-3xl mx-auto">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full
                  bg-gradient-to-r from-[#3644FE]/10 to-[#B345ED]/10 
                  border border-primary/20 mb-6">
        <Download class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-primary">Premium Templates</span>
      </div>
      
      <h2 class="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight mb-6 {HEADLINE}">
        Industry-Specific<br>
        <span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] bg-clip-text text-transparent">
          Template Bundles
        </span>
      </h2>
      <p class="text-xl text-muted-foreground leading-relaxed">
        Skip the setup. Start with proven wireframe templates tailored to your industry.
      </p>
    </div>
    
    <TemplateStore />
  </section>



	<SignUpForm 
		variant="compact"
		showBenefits={false}
		showSocialProof={true}
		className="max-w-md mx-auto"
	/>

  <!-- Comparison Section -->
  <section class="py-24 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <div class="text-center mb-16 max-w-3xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight mb-6 {HEADLINE}">
        Compare All Features
      </h2>
      <p class="text-xl text-muted-foreground">
        See exactly what's included in each plan
      </p>
    </div>
    
    <CompareTable />
  </section>
  

  
  <!-- FAQ Section -->
  <section class="py-24 border-t border-border/50 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <div class="text-center mb-16 max-w-3xl mx-auto">
      <h2 class="text-4xl font-semibold leading-[1.1] tracking-tight mb-4 {HEADLINE}">
        Questions & Answers
      </h2>
      <p class="text-xl text-muted-foreground">
        Everything you need to know about Pipewriter pricing and features
      </p>
    </div>
    
    <FAQ />
  </section>
  
<!-- </main> -->