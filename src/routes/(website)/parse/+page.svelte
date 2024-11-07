<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div class="min-h-screen bg-white">
  <!-- Hero Section (detected as single-cell table with multiple children) -->
  <section 
    class="container mx-auto px-4 py-16 text-center"
    in:fade={{duration: 300, delay: 150}}
  >
    <h2 class="text-4xl font-bold mb-4">Tinder for horses</h2>
    <p class="text-lg text-gray-600 mb-8">Equine app for lovers.</p>
    
    <!-- Button (detected as single-cell table with button pattern) -->
    <button 
      class="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
    >
      Sign Up
    </button>
  </section>

  <!-- Feature Row (detected as 1x3 table with feature-row pattern) -->
  <section class="bg-gray-50 py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <!-- Empty cells in original table -->
        <div class="col-span-2">
          <div class="bg-gray-200 h-64 rounded-lg"/>
        </div>
        
        <!-- Content cell -->
        <div class="space-y-4">
          <p class="text-sm font-semibold text-gray-500">APP</p>
          <h2 class="text-3xl font-bold">
            Swipe your way to greener pastures
          </h2>
          <p class="text-gray-600">
            App paragraph 10-40 words.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Support Section (also detected as 1x3 table) -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Content cell -->
        <div class="space-y-4">
          <p class="text-sm font-semibold text-gray-500">SUPPORT</p>
          <h2 class="text-3xl font-bold">
            The design is very human
          </h2>
          <p class="text-gray-600">
            Very easy to use.
          </p>
        </div>
        
        <!-- Empty cells in original table -->
        <div class="col-span-2">
          <div class="bg-gray-200 h-64 rounded-lg"/>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  /* Add any Svelte-scoped styles here */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>