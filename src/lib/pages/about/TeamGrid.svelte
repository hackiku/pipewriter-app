<!-- $lib/pages/about/TeamGrid.svelte -->
<script lang="ts">
  const team = [
    {
      name: "Ivan K.",
      role: "Technical Writing & Product",
      image: "/team/ivan.jpg",
      fallback: "IK"
    },
    {
      name: "You?",
      role: "Technical Writer",
      image: "/team/placeholder.jpg",
      fallback: "?"
    }
  ];
</script>

<section class="container py-24 border-t">
  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {#each team as member}
      <div class="flex flex-col items-center text-center space-y-4">
        <div class="w-32 h-32 rounded-full bg-muted overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name}
            class="w-full h-full object-cover"
            onerror="this.parentElement.innerHTML = '<div class=\'w-full h-full flex items-center justify-center text-2xl font-medium\'>{member.fallback}</div>'"
          />
        </div>
        <div>
          <h3 class="font-medium">{member.name}</h3>
          <p class="text-sm text-muted-foreground">{member.role}</p>
        </div>
      </div>
    {/each}
  </div>
</section>