<!-- src/lib/(space)/repacks/firefly/components/cta/BookModal.svelte -->
<script lang="ts">
  import { Dialog, DialogContent, DialogPortal } from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { bookModalStore } from '../../stores/bookModalStore';
  import { X, Rocket, Globe, Mail, ArrowRight } from 'lucide-svelte';

  let website = '';
  let email = '';
  let message = '';

  function handleSubmit() {
    bookModalStore.close();
  }

  $: open = $bookModalStore;

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) bookModalStore.close();
  }
</script>

<Dialog {open} onOpenChange={handleOpenChange}>
  <DialogPortal>
    <DialogContent class="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[calc(100vw-2rem)] sm:w-[calc(100vw-4rem)] h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] max-w-6xl border-0 bg-transparent p-0 shadow-none">
      <!-- Modal Backdrop -->
      <div class="absolute inset-0 bg-black/95 backdrop-blur-sm" />

      <!-- Close Button -->
      <button
        class="absolute right-4 top-4 z-10 p-2 text-zinc-400 
               hover:text-[#F5FF00] transition-colors"
        on:click={() => bookModalStore.close()}
      >
        <X class="w-6 h-6" />
      </button>

      <!-- Main Container with Border -->
      <div class="relative h-full border border-[#F5FF00]/50">
        <div class="h-full grid md:grid-cols-5">
          <!-- Left Panel - Image/Background -->
          <div class="hidden md:block md:col-span-2 bg-zinc-950 relative overflow-hidden">
            <!-- Diagonal Stripe Pattern -->
            <div 
              class="absolute inset-0 bg-[linear-gradient(-45deg,#F5FF0010_1px,transparent_1px,transparent_20px)] 
                     bg-[length:30px_30px]"
            />
            
            <!-- Content -->
            <div class="relative h-full p-8 md:p-12 flex flex-col justify-between">
              <div class="space-y-4">
                <h2 class="text-lg text-[#F5FF00] font-medium tracking-wider">
                  MAKE YOUR WEBSITE
                </h2>
                <h3 class="text-4xl font-light text-white">
                  Ready for Launch
                </h3>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-2 gap-8">
                {#each [['7 Days', 'Build Time'], ['$2,000', 'Per Page'], ['24/7', 'Support'], ['100%', 'Satisfaction']] as [value, label]}
                  <div class="space-y-1">
                    <div class="text-2xl font-light text-white">{value}</div>
                    <div class="text-sm text-zinc-400">{label}</div>
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <!-- Right Panel - Form -->
          <div class="md:col-span-3 p-8 md:p-12 overflow-y-auto">
            <form class="max-w-xl mx-auto space-y-8" on:submit|preventDefault={handleSubmit}>
              <!-- Form content stays the same -->
              <div class="relative">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none opacity-40">
                  <Globe class="w-5 h-5" />
                </div>
                <Input 
                  type="url"
                  bind:value={website}
                  placeholder="Current website URL"
                  class="h-14 pl-12 bg-white/5 border-[#F5FF00]/20 
                         focus-visible:ring-[#F5FF00]/50"
                />
              </div>

              <div class="relative">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none opacity-40">
                  <Mail class="w-5 h-5" />
                </div>
                <Input 
                  type="email"
                  bind:value={email}
                  placeholder="Work email"
                  class="h-14 pl-12 bg-white/5 border-[#F5FF00]/20 
                         focus-visible:ring-[#F5FF00]/50"
                />
              </div>

              <div class="relative">
                <div class="absolute top-4 left-4 opacity-40">
                  <Rocket class="w-5 h-5" />
                </div>
                <Textarea
                  bind:value={message}
                  placeholder="Tell us about your mission..."
                  class="min-h-[120px] pl-12 pt-3 bg-white/5 border-[#F5FF00]/20 
                         focus-visible:ring-[#F5FF00]/50"
                />
              </div>

              <button
                type="submit"
                class="group relative w-full h-14 bg-[#F5FF00] text-black
                       font-medium tracking-wider"
              >
                <span class="flex items-center justify-center gap-2">
                  START YOUR REPACK
                  <ArrowRight class="w-4 h-4 transition-transform 
                                    group-hover:translate-x-1" />
                </span>
                
                <!-- Button Borders -->
                <div class="absolute inset-0 border border-[#F5FF00]/50 
                            translate-x-1 translate-y-1 transition-transform
                            group-hover:translate-x-0 group-hover:translate-y-0" />
              </button>

              <p class="text-sm text-zinc-400 text-center">
                7-day redesign sprint with production-ready code.
                <br>
                Perfect for space startups that need a proper landing.
              </p>
            </form>
          </div>
        </div>
      </div>
    </DialogContent>
  </DialogPortal>
</Dialog>