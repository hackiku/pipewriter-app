<!-- lib/pages/producthunt/ProductHunt.svelte -->
<script lang="ts">
  import { AlertTriangle } from 'lucide-svelte';
  import EmailForm from '$lib/components/EmailForm.svelte';
  import BackgroundPattern from '$lib/components/BackgroundPattern.svelte';
  import LogosMarquee from '$lib/components/LogosMarquee.svelte';
  import PreviewStats from './components/PreviewStats.svelte';
  import LaunchTimer from './components/LaunchTimer.svelte';

  // Launch date - adjust as needed
  const launchDate = new Date('2024-02-01T08:00:00Z');
</script>

<main class="bg-background text-foreground relative overflow-x-hidden min-h-screen">
  <!-- Background Pattern -->
  <div class="fixed inset-0 pointer-events-none">
    <BackgroundPattern size="lg" opacity="high" gradient={true} />
  </div>

  <!-- Content -->
  <div class="relative">
    <!-- Hero Section -->
    <section class="pt-32 pb-24 relative">
      <div class="container max-w-6xl mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <!-- Product Hunt Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EA532A]/10 text-[#EA532A] border border-[#EA532A]/20">
            <img src="/icons/producthunt.svg" alt="Product Hunt" class="w-5 h-5" />
            <span class="text-sm font-medium">Coming Soon on Product Hunt</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Help Us Launch Pipewriter on Product Hunt
          </h1>

          <p class="text-xl text-muted-foreground">
            Join 100+ early supporters who'll help us reach #1 on launch day. 
            Be notified when we go live and get exclusive launch-day perks.
          </p>

          <!-- Email Capture -->
          <div class="max-w-md mx-auto pt-4">
            <EmailForm 
              size="default"
              wrap={true}
              className="shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Launch Timer -->
    <section class="py-12 relative border-t border-border/50">
      <div class="container">
        <LaunchTimer {launchDate} />
      </div>
    </section>

    <!-- Preview Stats -->
    <section class="py-24 relative border-t border-border/50">
      <div class="container">
        <div class="flex justify-between items-start gap-12">
          <!-- Left: Stats -->
          <div class="w-1/2">
            <PreviewStats />
          </div>

          <!-- Right: Sign Up Benefits -->
          <div class="w-1/2 space-y-8">
            <h3 class="text-2xl font-semibold">Launch Day Perks</h3>
            
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 class="font-medium">Early notification</h4>
                  <p class="text-muted-foreground">
                    Be among the first to know when we launch and help us climb the rankings
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 class="font-medium">Launch day discount</h4>
                  <p class="text-muted-foreground">
                    Special 24-hour pricing for early supporters
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 class="font-medium">Extended trial & support</h4>
                  <p class="text-muted-foreground">
                    Get extra trial days and priority support access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="py-12 relative border-t">
      <div class="container">
        <LogosMarquee />
      </div>
    </section>

    <!-- Warning Note -->
    <div class="fixed bottom-0 inset-x-0 p-4 bg-background/80 backdrop-blur-xl border-t">
      <div class="container flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <AlertTriangle class="w-4 h-4" />
        <p>
          The first 4 hours are critical for Product Hunt rankings. Your support means everything!
        </p>
      </div>
    </div>
  </div>
</main>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>