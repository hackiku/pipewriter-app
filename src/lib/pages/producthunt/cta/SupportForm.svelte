<!-- lib/pages/producthunt/cta/SupportForm.svelte -->
<script lang="ts">
  import { ArrowUp, Twitter, Github } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import { addSupporter } from '../utils/support';
  
  let email = '';
  let name = '';
  let twitter = '';
  let github = '';
  let isSubmitting = false;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!email || isSubmitting) return;
    
    isSubmitting = true;
    try {
      await addSupporter({ email, name, twitter, github });
      // Handle success (could emit an event or show success state)
    } catch (error) {
      // Handle error
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form 
  class="space-y-4 bg-background/50 backdrop-blur-xl p-6 rounded-xl border shadow-xl"
  on:submit={handleSubmit}
>
  <!-- Required Email -->
  <div class="space-y-2">
    <input
      type="email"
      placeholder="your@email.com"
      bind:value={email}
      required
      class="w-full px-4 py-3 rounded-lg text-lg font-medium bg-white dark:bg-gray-950
             border border-border focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>

  <!-- Optional Name -->
  <div class="space-y-2">
    <input
      type="text"
      placeholder="Your name (optional)"
      bind:value={name}
      class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-950
             border border-border focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>

  <!-- Social Links -->
  <div class="grid grid-cols-2 gap-3">
    <div class="relative">
      <Twitter class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Twitter handle"
        bind:value={twitter}
        class="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-950
               border border-border focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>

    <div class="relative">
      <Github class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Github username"
        bind:value={github}
        class="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-950
               border border-border focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  </div>

  <!-- Submit Button -->
  <Button
    type="submit"
    disabled={!email || isSubmitting}
    class="w-full py-6 text-lg font-medium bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:from-[#B345ED] hover:to-[#3644FE]"
  >
    <div class="flex items-center justify-center gap-2">
      <span>{isSubmitting ? 'Adding you...' : 'Support the Launch'}</span>
      <ArrowUp class="w-4 h-4" />
    </div>
  </Button>

  <!-- Privacy Note -->
  <p class="text-sm text-center text-muted-foreground">
    We'll only email you about the launch. Unsubscribe anytime.
  </p>
</form>