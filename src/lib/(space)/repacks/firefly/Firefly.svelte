<!-- src/lib/(space)/repacks/firefly/Firefly.svelte -->
<script lang="ts">
  import Breadcrumbs from "../../components/Breadcrumbs.svelte";
  // import Breadcrumbs from "$lib/(space)/components/Breadcrumbs.svelte";
  import Hero from "./sections/Hero.svelte";
  import Vehicles from "./sections/Vehicles.svelte";
  import News from "./sections/News.svelte";
  import Careers from "./sections/Careers.svelte";

  const breadcrumbs = [
    { label: "Space", href: "/space" },
    { label: "Repacks", href: "/space/repacks" },
    { label: "Firefly Aerospace" }
  ];
</script>

<div class="bg-black text-white">
  <!-- Breadcrumbs -->
  <div class="container py-6s">
    <Breadcrumbs items={breadcrumbs} />
  </div>

  <!-- Main Content -->
  <main>
    <Hero />
    <Vehicles />
    <News />
    <Careers />
  </main>
</div>