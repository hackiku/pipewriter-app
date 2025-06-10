<!-- src/lib/components/cta/signin/SignUpForm.svelte -->
<script lang="ts">
  import { ArrowRight, Check, Zap, FileText, Users } from "lucide-svelte";
  import GetStartedButton from './GetStartedButton.svelte';
  import LogInButton from './LogInButton.svelte';
  
  export let variant: "default" | "compact" | "hero" = "default";
  export let showBenefits = true;
  export let showSocialProof = true;
  export let className = "";
  
  const benefits = [
    "14-day free trial of Pro features",
    "Native Google Docs integration", 
    "84+ professional wireframe elements",
    "No credit card required"
  ];

  const socialProof = {
    userCount: "200+",
    rating: "4.8",
    testimonial: {
      text: "This changes everything for us UX writers.",
      author: "Eoin C.",
      role: "SaaS Copywriter"
    }
  };
</script>

<div class="w-full {className}">
  
  {#if variant === "hero"}
    <!-- Hero variant - full section -->
    <div class="relative p-12 rounded-2xl border 
                bg-gradient-to-br from-primary/5 to-primary/10
                border-primary/10 overflow-hidden">
      
      <!-- Background pattern -->
      <div class="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
      
      <div class="relative max-w-4xl mx-auto text-center space-y-8">
        
        <!-- Header -->
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full
                      bg-gradient-to-r from-[#3644FE]/10 to-[#B345ED]/10 
                      border border-primary/20">
            <Zap class="w-4 h-4 text-primary" />
            <span class="text-sm font-medium text-primary">Start Building Better UX</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold leading-tight">
            Transform Your Writing<br>
            <span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] bg-clip-text text-transparent">
              Into Professional Wireframes
            </span>
          </h2>
          
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join hundreds of UX writers and copywriters creating professional deliverables 
            directly in Google Docs. No design experience required.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <GetStartedButton 
            size="lg" 
            text="Start Free Trial"
            subtext="14 days, no credit card"
            source="hero-signup" 
          />
          <LogInButton 
            variant="button" 
            size="lg"
            text="I Have an Account"
            source="hero-login"
            showArrow={true}
          />
        </div>

        {#if showSocialProof}
          <!-- Social proof -->
          <div class="pt-8 border-t border-border/20">
            <div class="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div class="flex items-center gap-2">
                <Users class="w-4 h-4" />
                <span><strong class="text-foreground">{socialProof.userCount}</strong> writers building better UX</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex text-yellow-500">★★★★★</div>
                <span><strong class="text-foreground">{socialProof.rating}</strong> average rating</span>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>

  {:else if variant === "compact"}
    <!-- Compact variant -->
    <div class="p-6 rounded-xl border bg-card">
      <div class="text-center space-y-4">
        <h3 class="text-xl font-semibold">Ready to Get Started?</h3>
        <p class="text-muted-foreground">
          Join the waitlist and be first to access the new UX writing tools.
        </p>
        
        <div class="flex flex-col gap-3">
          <GetStartedButton 
            fullWidth={true}
            text="Start Free Trial"
            source="compact-signup"
          />
          <LogInButton 
            variant="link"
            text="Already have an account?"
            source="compact-login"
            className="text-center justify-center"
          />
        </div>
      </div>
    </div>

  {:else}
    <!-- Default variant -->
    <div class="p-8 rounded-xl border bg-card/50 backdrop-blur-sm">
      <div class="max-w-2xl mx-auto">
        
        <!-- Header -->
        <div class="text-center mb-8 space-y-4">
          <h3 class="text-2xl font-semibold">
            Start Building Professional UX Deliverables
          </h3>
          <p class="text-lg text-muted-foreground">
            Get full access to Pipewriter's wireframing tools. 
            No design experience required.
          </p>
        </div>

        {#if showBenefits}
          <!-- Benefits -->
          <div class="grid md:grid-cols-2 gap-4 mb-8">
            {#each benefits as benefit}
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 
                            flex items-center justify-center">
                  <Check class="w-3 h-3 text-green-600 dark:text-green-400" />
                </div>
                <span class="text-sm">{benefit}</span>
              </div>
            {/each}
          </div>
        {/if}

        <!-- CTA Section -->
        <div class="space-y-4">
          <GetStartedButton 
            fullWidth={true}
            size="lg"
            text="Start Your Free Trial"
            subtext="Access all Pro features for 14 days"
            source="default-signup"
          />
          
          <div class="text-center">
            <LogInButton 
              variant="link"
              text="Already have an account? Log in"
              source="default-login"
              className="text-center justify-center"
            />
          </div>
        </div>

        {#if showSocialProof}
          <!-- Testimonial -->
          <div class="mt-8 pt-6 border-t border-border/20 text-center">
            <blockquote class="text-sm italic text-muted-foreground mb-2">
              "{socialProof.testimonial.text}"
            </blockquote>
            <cite class="text-xs text-muted-foreground">
              — {socialProof.testimonial.author}, {socialProof.testimonial.role}
            </cite>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .bg-grid-white {
    background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  }
</style>