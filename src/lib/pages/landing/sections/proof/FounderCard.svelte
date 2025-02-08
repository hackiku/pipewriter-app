<!-- src/lib/pages/landing/sections/proof/FounderCard.svelte -->
<script lang="ts">
	import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
	
</script>

<div class="relative w-full rounded-xl overflow-hidden">
  <!-- <div class="p-[2px] rounded-xl bg-gradient-to-r from-[#3644FE] to-[#B345ED]"> -->
  <div class="inset-2 w-full h-full rounded-xl gradient-to-r from-[#3644FE] to-[#B345ED]">
    <div class="rounded-xl bg-gradient-to-br from-[#3644FE]/15 to-[#B345ED]/20 p-6 ">
      <div class="flex items-center gap-4 mb-6">
        <img
          src="/people/ivan-karaman.png"
          alt="Ivan Karaman"
          class="w-12 h-12 rounded-full border-2 border-white/10"
        />
        <div>
          <h3 class="text-xl font-medium">Ivan Karaman</h3>
          <p class="text-sm text-muted-foreground">Indie Founder</p>
        </div>
      </div>

      <div class="space-y-4 text-md mb-6">
				<p class="text-muted-foreground">
					I built Pipewriter to survive years of SaaS copy gigs. 
					It's my jar of hearts of ADHD scripts, hacks and tricks, productized
					for your writerly enjoyment. They can AI all they like, but writing will
					always be the the <span class="inline-block animate-heartbeat">💜</span> of product design.
				</p>
				<!-- TODO: change heart on button hover -->
      </div>

			<BuyButton
				size="sm"
				text="Get Pipewriter"
				showPrice={false}
				source="hero"
				price="— $97"
			/>

    </div>
  </div>
</div>


<style>
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    8% { transform: scale(1.15); }
    16% { transform: scale(1); }
    24% { transform: scale(1.12); }
    32% { transform: scale(1); }
  }

  .animate-heartbeat {
    animation: heartbeat 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    transform-origin: center;
    will-change: transform;
    backface-visibility: hidden;
  }
</style>
