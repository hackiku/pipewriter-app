<!-- src/lib/pages/landing/sections/benefits/Benefits.svelte -->
<script lang="ts">
  import { Clock, Trophy, HandCoins, Zap } from 'lucide-svelte';

  const benefits = [
    {
      icon: Clock,
      metric: '4-6 hours',
      label: 'saved per project',
      title: 'Design While You Write',
      description: 'Stop context-switching between writing and design tools. Create wireframes directly in your Google Doc as the ideas flow, maintaining creative momentum throughout your UX writing process.'
    },
    {
      icon: Trophy,
      metric: '80%',
      label: 'faster client approval',
      title: 'Win Clients Faster',
      description: 'Present polished, interactive wireframes that bring your copy to life. When clients can visualize the end product during the writing phase, they approve projects faster and request fewer revisions.'
    },
    {
      icon: HandCoins,
      metric: '2-3x',
      label: 'higher project value',
      title: 'Charge for Design Skills',
      description: 'Expand your service offerings beyond pure copywriting. By delivering both UX writing and wireframes, you can command higher rates and position yourself as a full-service content strategist.'
    },
    {
      icon: Zap,
      metric: 'Same Day',
      label: 'development handoff',
      title: 'Streamline Development',
      description: 'Export your wireframes directly to production-ready code. Engineers receive clean, documented components that implement your exact vision, eliminating costly back-and-forth during development.'
    }
  ];
</script>

<div class="relative py-24 bg-muted/30">
  <div class="container max-w-6xl">
    <!-- Section Header -->
    <div class="text-center space-y-4 mb-20">
      <h2 class="text-4xl font-medium">Write at the Speed of Thought</h2>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Stop letting design tools slow down your writing flow. Pipewriter helps you create 
        better content faster, while delivering more value to your clients.
      </p>
    </div>

    <!-- Benefits Grid -->
    <div class="grid md:grid-cols-2 gap-12">
      {#each benefits as benefit}
        <div class="relative group">
          <!-- Metric Chip -->
          <div class="inline-flex items-center gap-2 px-4 py-2 
                      rounded-full bg-primary/10 mb-6">
            <svelte:component this={benefit.icon} class="w-4 h-4 text-primary" />
            <span class="font-medium text-primary">{benefit.metric}</span>
            <span class="text-sm text-primary/80">{benefit.label}</span>
          </div>

          <!-- Content -->
          <div class="space-y-3">
            <h3 class="text-2xl font-medium">{benefit.title}</h3>
            <p class="text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </div>

          <!-- Hover Effect -->
          <div class="absolute inset-0 -m-4 rounded-xl 
                      bg-primary/5 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300" />
        </div>
      {/each}
    </div>
  </div>

  <!-- Background Pattern -->
  <div class="absolute inset-0 pointer-events-none opacity-30">
    <div class="absolute inset-0 
                bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)]" />
  </div>
</div>