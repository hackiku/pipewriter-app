<!-- src/lib/(space)/repacks/firefly/sections/Careers.svelte -->
<script lang="ts">
  import PrimaryButton from "../components/cta/PrimaryButton.svelte";
</script>

<section class="py-24 bg-zinc-950 relative">
  <!-- Grid overlay -->
  <div class="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.7),transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.7),transparent_2px)] bg-[length:40px_40px]" />
  
  <div class="container relative">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div class="space-y-8">
        <div class="space-y-2">
          <h2 class="text-lg text-[#F5FF00] font-medium tracking-wider">
            JOIN OUR TEAM
          </h2>
          <h3 class="text-4xl font-light text-white">
            Dream Big at Firefly
          </h3>
        </div>

        <p class="text-lg text-zinc-300 leading-relaxed">
          From rocket propulsion and test operations to spacecraft, 
          we have open roles across the company. Join us in making 
          space access more reliable, affordable, and convenient.
        </p>

        <PrimaryButton href="/careers" class="px-8">
          View Open Positions
        </PrimaryButton>
      </div>

      <!-- Right side decorative element -->
      <div class="relative aspect-square">
        <div class="absolute inset-0 border border-[#F5FF00]/20" />
        <div class="absolute inset-8 border border-[#F5FF00]/10" />
        <div class="absolute inset-16 border border-[#F5FF00]/5" />
      </div>
    </div>
  </div>
</section>