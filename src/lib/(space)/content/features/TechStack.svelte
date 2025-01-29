<!-- src/lib/(space)/content/features/TechStack.svelte -->
<script lang="ts">
  import StackGrid from "../../components/proof/StackGrid.svelte";
  import SpaceButton from "../../components/cta/SpaceButton.svelte";
</script>

<div class="bg-gradient-to-br from-indigo-600/[0.1] to-purple-600/[0.1] 
            border border-indigo-600/10
            rounded-[2.5rem] rounded-tl-none">
  <div class="py-16 text-center">
    <div class="relative">
      <StackGrid 
        toolIds={[
          'svelte',
          'streamlit', 
          'react', 
          'nextjs', 
          'shopify', 
          'vue', 
          'remix', 
          'supabase', 
          'firebase'
        ]} 
      />
    </div>

    <div class="mt-12">
      <SpaceButton size="lg" text="Book Chute Repack" />
    </div>
  </div>
</div>