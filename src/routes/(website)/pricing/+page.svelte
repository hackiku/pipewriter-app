<!-- src/routes/(website)/pricing/+page.svelte -->
<script lang="ts">
	import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  import LogoSystem from "$lib/components/branding/LogoSystem.svelte";
  import { CheckCircle, Clock, Users } from "lucide-svelte";
	
	// import PricingPage from "$lib/pages/pricing/PricingPage.svelte";
</script>

<svelte:head>
  <title>Pricing - Pipewriter UX App for Writers</title>
  <meta name="description" content="Be first to access the Google Docs wireframing tool that's changing how writers prototype." />
</svelte:head>

<!-- <PricingPage /> -->

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
  <!-- Background elements -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
  </div>

  <!-- Main content -->
  <div class="relative z-10 max-w-2xl mx-auto text-center space-y-8">
    
    <!-- Logo -->
    <!-- <div class="flex justify-center">
      <LogoSystem size="lg" />
    </div> -->

    <!-- Status badge -->
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
      <Clock class="w-4 h-4 text-amber-600 dark:text-amber-400" />
      <span class="text-sm font-medium text-amber-700 dark:text-amber-300">
        Pending Google Workspace Approval
      </span>
    </div>

    <!-- Main headline -->
    <div class="space-y-4">
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-[#171717] dark:text-[#CFCFCF]">
        The Wait is Almost
        <span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] bg-clip-text text-transparent">
          Over
        </span>
      </h1>
      
      <p class="text-xl md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
        Our Google Docs add-on is built and ready. We're just waiting for the final approval 
        to unleash wireframes where you already write.
      </p>
    </div>

    <!-- Progress indicators -->


    <!-- Email signup -->
    <div class="space-y-6">
      <div class="space-y-3">
        <!-- <h2 class="text-2xl font-semibold">Get Notified First</h2> -->
        <p class="text-muted-foreground">
          Join <span class="font-semibold text-foreground">200+</span> writers waiting for launch day
        </p>
      </div>

      <div class="max-w-md mx-auto">
        <EmailForm 
          buttonText="Join Waitlist"
          size="lg"
          wrap={false}
          source="Waitlist"
          className="w-full"
        />
      </div>

      <p class="text-sm text-muted-foreground">
        We'll email you the moment Google gives us the green light ✅
      </p>
    </div>

    <!-- Footer note -->

    <!-- <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
      <div class="flex flex-col items-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle class="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div class="text-center">
          <div class="font-semibold">App Built</div>
          <div class="text-sm text-muted-foreground">90+ elements ready</div>
        </div>
      </div>
      
      <div class="flex flex-col items-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <Clock class="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div class="text-center">
          <div class="font-semibold">Google Review</div>
          <div class="text-sm text-muted-foreground">3-5 business days</div>
        </div>
      </div>
      
      <div class="flex flex-col items-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
          <Users class="w-6 h-6 text-primary" />
        </div>
        <div class="text-center">
          <div class="font-semibold">You're In</div>
          <div class="text-sm text-muted-foreground">Instant access</div>
        </div>
      </div>
    </div> -->

  </div>
</div>

<!-- <style>
  /* Subtle background animation */
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(1deg); }
  }
  
  .bg-gradient-to-br {
    animation: float 6s ease-in-out infinite;
  }
</style> -->