<!-- src/lib/(space)/repacks/firefly/sections/News.svelte -->
 
<script lang="ts">
  import PrimaryButton from "../components/cta/PrimaryButton.svelte";
  
	const news = [
    {
      date: "2024-01-10",
      title: "Behind the scenes at Rocket Ranch",
      category: "Press",
      href: "#"
    },
    // Add more news items
  ];
</script>

<section class="py-24 bg-black">
  <div class="container">
    <div class="space-y-12">
      <div class="space-y-2">
        <h2 class="text-lg text-[#F5FF00] font-medium tracking-wide">
          LATEST NEWS
        </h2>
        <h3 class="text-4xl font-light text-white">
          Updates from Firefly
        </h3>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        {#each news as item}
          <a href={item.href} class="block group">
            <div class="aspect-video bg-zinc-900 rounded-lg mb-4" />
            <p class="text-sm text-zinc-500">{item.date} · {item.category}</p>
            <h4 class="text-lg text-white group-hover:text-[#F5FF00] 
                     transition-colors">
              {item.title}
            </h4>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- src/lib/(space)/repacks/firefly/sections/Careers.svelte -->
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