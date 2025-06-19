<!-- src/routes/(website)/contact/+page.svelte -->
<script lang="ts">
  import { Copy, Check } from "lucide-svelte";
  import { socialLinks } from "$data/navigation";
  import { writable } from 'svelte/store';
  
  const copied = writable(false);

  function copyEmail() {
    navigator.clipboard.writeText('ivan@pipewriter.io').then(() => {
      copied.set(true);
      setTimeout(() => copied.set(false), 2000);
    });
  }
</script>

<svelte:head>
  <title>Contact - Pipewriter</title>
  <meta name="description" content="Get in touch with Ivan Karaman, founder of Pipewriter." />
</svelte:head>

<section class="relative pt-36 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 border-b-2">
  <!-- Background elements -->
  <div class="fixed inset-0 pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
  </div>

  <div class="max-w-4xl mx-auto relative z-10">
    
    <!-- Main Content -->
    <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
      
      <!-- Left: Contact Info -->
      <div class="space-y-8">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#171717] dark:text-[#CFCFCF]">
            Say Hi 👋
          </h1>
          <p class="text-xl text-muted-foreground leading-relaxed">
            Or say "You're Hired" if you need UX copywriting, design, or dev work.
          </p>
        </div>

        <!-- Email -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <a 
              href="mailto:ivan@pipewriter.io"
              class="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
                     bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:underline transition-all"
            >
              ivan@pipewriter.io
            </a>
            <button 
              on:click={copyEmail}
              class="p-2 text-muted-foreground hover:text-foreground transition-colors 
                     focus:outline-none rounded-lg hover:bg-muted"
              aria-label="Copy email"
            >
              {#if $copied}
                <Check class="w-5 h-5 text-green-500" />
              {:else}
                <Copy class="w-5 h-5" />
              {/if}
            </button>
          </div>
          
          {#if $copied}
            <p class="text-sm text-green-500 transition-opacity">Copied to clipboard!</p>
          {/if}
        </div>

        <!-- Quick Info -->
        <div class="space-y-3 text-muted-foreground">
          <p>🚀 Aerospace engineer turned SaaS copywriter</p>
          <p>⚙️ Full-stack developer</p>
          <p>✍️ 10+ years writing for tech companies</p>
        </div>

        <!-- Support Note -->
        <div class="p-4 bg-muted/50 border border-border rounded-xl">
          <p class="text-sm text-muted-foreground">
            Support questions about Pipewriter? Email works great, or catch me on socials below.
          </p>
        </div>

        <!-- Social Links -->
        <div class="flex items-center gap-4">
          {#each socialLinks as social}
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 rounded-xl border border-border hover:bg-muted 
                     hover:border-primary/20 transition-all duration-200 group"
              aria-label={social.ariaLabel}
            >
              <img 
                src={social.svg}
                alt={social.name}
                class="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
              />
            </a>
          {/each}
        </div>
      </div>

      <!-- Right: Decorative -->
      <div class="flex justify-center lg:justify-end">
        <div class="w-full max-w-[300px] aspect-[350/480] rounded-2xl overflow-hidden">
          <iframe 
            src="https://giphy.com/embed/yFgSFDgjLveZL3mFNe" 
            width="100%" 
            height="100%" 
            class="giphy-embed" 
            title="Decorative animation"
            aria-hidden="true"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>