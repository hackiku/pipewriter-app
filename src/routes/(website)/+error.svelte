<!-- src/routes/+error.svelte -->
<script>
  import { page } from '$app/stores';
</script>

<div class="container flex items-center justify-center min-h-[70vh]">
  <div class="text-center space-y-4">
    <h1 class="text-4xl font-bold">404</h1>
    <p class="text-muted-foreground">
      {$page.status === 404 
        ? "Page not found" 
        : "Something went wrong"}
    </p>
    <a href="/" class="text-sm underline">Go home</a>
  </div>
</div>