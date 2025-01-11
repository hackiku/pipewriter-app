<!-- src/lib/(space)/repacks/firefly/sections/Vehicles.svelte -->
<script lang="ts">
  import PrimaryButton from "../components/cta/PrimaryButton.svelte";
</script>

<section class="py-24 bg-zinc-950">
  <div class="container">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="space-y-8">
        <div class="space-y-2">
          <h2 class="text-lg text-[#F5FF00] font-medium tracking-wide">
            ALPHA & MLV
          </h2>
          <h3 class="text-4xl font-light text-white">
            Launch Vehicles - responsive space
          </h3>
        </div>

        <p class="text-lg text-zinc-300 leading-relaxed">
          From small-lift Alpha to our medium launch vehicle collaboration 
          with Northrop Grumman, Firefly delivers reliable, responsive, 
          and affordable access to space.
        </p>

        <div class="flex gap-4">
          <PrimaryButton href="/launch/alpha">
            About Alpha
          </PrimaryButton>
          <PrimaryButton href="/launch/mlv">
            About MLV
          </PrimaryButton>
        </div>
      </div>

      <div class="aspect-square rounded-lg bg-zinc-900" />
    </div>
  </div>
</section>