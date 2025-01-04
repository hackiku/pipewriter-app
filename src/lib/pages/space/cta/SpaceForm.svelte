<!-- src/lib/pages/space/SpaceForm.svelte -->

<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Button } from "$lib/components/ui/button";
  
  export let website = '';
  export let email = '';
  export let comment = '';
  
  function handleSubmit() {
    // Implementation coming soon
    console.log({ website, email, comment });
  }
</script>

<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
  <div class="space-y-2">
    <label for="website" class="text-lg font-medium">
      Your Website
    </label>
    <Input 
      id="website"
      type="url" 
      placeholder="https://"
      class="text-lg h-12"
      bind:value={website}
    />
  </div>

  <div class="space-y-2">
    <label for="email" class="text-lg font-medium">
      Email
    </label>
    <Input 
      id="email"
      type="email" 
      placeholder="you@company.com"
      class="text-lg h-12"
      bind:value={email}
    />
  </div>

  <div class="space-y-2">
    <label for="comment" class="text-lg font-medium">
      Project Details
    </label>
    <Textarea
      id="comment"
      placeholder="Tell us about your project..."
      class="text-lg min-h-[120px]"
      bind:value={comment}
    />
  </div>

  <Button type="submit" class="w-full h-12 text-lg">
    Get Your Redesign
  </Button>
</form>