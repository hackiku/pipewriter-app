<!-- src/lib/(space)/repacks/firefly/sections/Careers.svelte -->

<script lang="ts">
  import PrimaryButton from "../components/cta/PrimaryButton.svelte";
</script>

<section class="py-24 bg-zinc-950">
  <div class="container">
    <div class="max-w-2xl mx-auto text-center space-y-8">
      <div class="space-y-2">
        <h2 class="text-lg text-[#F5FF00] font-medium tracking-wide">
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
  </div>
</section>