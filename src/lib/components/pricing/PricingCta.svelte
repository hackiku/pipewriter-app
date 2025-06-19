<!-- src/lib/components/pricing/PricingCta.svelte -->
<script lang="ts">
  import { Clock, Zap, Check } from "lucide-svelte";
  import GetStartedButton from "$lib/components/cta/signin/GetStartedButton.svelte";
  
</script>

  <!-- Background elements -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
    <!-- Header -->
    <div class="text-center mb-16 max-w-3xl mx-auto">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                  bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
        <Clock class="w-4 h-4 text-amber-600 dark:text-amber-400" />
        <span class="text-sm font-medium text-amber-700 dark:text-amber-300">
          Pending Google Approval
        </span>
      </div>
      
      <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6">
        Start Wireframing
        <span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] bg-clip-text text-transparent">
          Where You Write
        </span>
      </h2>
      
      <p class="text-xl text-muted-foreground leading-relaxed">
        Pipewriter transforms Google Docs into a professional wireframing tool.
        No more juggling between docs and design tools.
      </p>
    </div>
    
    <!-- Pricing Cards - Simplified -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- Free Plan -->
      <div class="bg-card border border-border rounded-2xl overflow-hidden transition-all hover:shadow-lg p-8">
        <div class="absolute -top-3 left-4">
          <div class="px-3 py-1 rounded-full text-xs font-medium
                      bg-muted text-muted-foreground border">
            Always Free
          </div>
        </div>
        
        <h3 class="text-2xl font-semibold mb-2">Free</h3>
        <p class="text-muted-foreground mb-6">Essential wireframing tools</p>
        
        <div class="mb-6">
          <div class="text-4xl font-bold">$0</div>
        </div>
        
        <ul class="space-y-3 mb-8">
          <li class="flex items-start gap-3">
            <div class="mt-0.5 p-1 rounded-full bg-muted">
              <Check class="w-3 h-3" />
            </div>
            <span class="text-sm">24 wireframe elements</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="mt-0.5 p-1 rounded-full bg-muted">
              <Check class="w-3 h-3" />
            </div>
            <span class="text-sm">Light/dark mode templates</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="mt-0.5 p-1 rounded-full bg-muted">
              <Check class="w-3 h-3" />
            </div>
            <span class="text-sm">Google Docs integration</span>
          </li>
        </ul>
        
        <GetStartedButton
          text="Join Waitlist"
          size="default"
          fullWidth={true}
          source="pricing-free"
          href="/waitlist"
        />
      </div>
      
      <!-- Pro Plan - Highlighted -->
      <div class="relative">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div class="px-4 py-2 rounded-full text-xs font-medium
                      bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white
                      shadow-lg">
            Most Popular
          </div>
        </div>
        
        <div class="p-8 rounded-2xl h-full flex flex-col
                    border-transparent bg-gradient-to-b from-primary/5 to-primary/10 shadow-xl">
          <!-- Gradient border -->
          <div class="absolute inset-0 rounded-2xl p-[1px] 
                      bg-gradient-to-b from-[#3644FE]/20 to-[#B345ED]/20 -z-10">
            <div class="absolute inset-[1px] rounded-2xl bg-background"></div>
          </div>
          
          <h3 class="text-2xl font-semibold mb-2">Pro</h3>
          <p class="text-muted-foreground mb-6">Full professional toolkit</p>
          
          <div class="mb-6">
            <div class="text-4xl font-bold">$10</div>
            <div class="text-muted-foreground">/month</div>
          </div>
          
          <ul class="space-y-3 mb-8 flex-grow">
            <li class="flex items-start gap-3">
              <div class="mt-0.5 p-1 rounded-full bg-primary text-primary-foreground">
                <Check class="w-3 h-3" />
              </div>
              <span class="text-sm">Everything in Free</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="mt-0.5 p-1 rounded-full bg-primary text-primary-foreground">
                <Check class="w-3 h-3" />
              </div>
              <span class="text-sm">90+ premium elements</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="mt-0.5 p-1 rounded-full bg-primary text-primary-foreground">
                <Check class="w-3 h-3" />
              </div>
              <span class="text-sm">Advanced color schemes</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="mt-0.5 p-1 rounded-full bg-primary text-primary-foreground">
                <Check class="w-3 h-3" />
              </div>
              <span class="text-sm">HTML export capabilities</span>
            </li>
          </ul>
          
          <GetStartedButton
            text="Early Access"
            size="default"
            fullWidth={true}
            source="pricing-pro"
            href="/waitlist"
            variant="primary"
          />
        </div>
      </div>
      
      <!-- Bundle Plan -->
      <div class="bg-card border border-border rounded-2xl overflow-hidden transition-all hover:shadow-lg p-8">
        <div class="absolute -top-3 right-4">
          <div class="px-3 py-1 rounded-full text-xs font-medium
                      bg-muted text-muted-foreground border">
            Best Value
          </div>
        </div>
        
        <h3 class="text-2xl font-semibold mb-2">Template Bundle</h3>
        <p class="text-muted-foreground mb-6">Ready-to-use wireframes</p>
        
        <div class="mb-6">
          <div class="text-4xl font-bold">$49</div>
          <div class="text-muted-foreground">one-time</div>
        </div>
        
        <ul class="space-y-3 mb-8">
          <li class="flex items-start gap-3">
            <div class="mt-0.5 p-1 rounded-full bg-muted">
              <Check class="w-3 h-3" />
            </div>
            <span class="text-sm">3 months Pro subscription</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="mt-0.5 p-1 rounded-full bg-muted">
              <Check class="w-3 h-3" />
            </div>
            <span class="text-sm">100+ premium wireframes</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="mt-0.5 p-1 rounded-full bg-muted">
              <Check class="w-3 h-3" />
            </div>
            <span class="text-sm">Industry-specific bundles</span>
          </li>
        </ul>
        
        <GetStartedButton
          text="Join Waitlist"
          size="default"
          fullWidth={true}
          source="pricing-bundle"
          href="/waitlist"
          variant="outline"
        />
      </div>
    </div>
    
    <!-- Bottom note -->
    <div class="text-center mt-16 space-y-4">
      <p class="text-muted-foreground text-lg">
        Sign up today to be first in line when we launch
      </p>
      <div class="flex items-center justify-center gap-8 text-sm text-muted-foreground">
        <span class="flex items-center gap-2">
          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          14-day free trial
        </span>
        <span class="flex items-center gap-2">
          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          No credit card required
        </span>
      </div>
    </div>
  </div>