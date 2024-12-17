<!-- $lib/components/Footer.svelte -->
<script lang="ts">
  import EmailForm from '$lib/components/EmailForm.svelte';
  import { GithubIcon, LinkedinIcon, Instagram, ShoppingBag } from 'lucide-svelte';
  import EarlyAccessButton from './cta/EarlyAccessButton.svelte';
  
  const year = new Date().getFullYear();

  const socials = [
    {
      name: 'Gumroad',
      url: 'https://pipewriter.gumroad.com',
      svg: 'icons/gumroad.svg',
      icon: ShoppingBag,
      ariaLabel: 'Get Pipewriter on Gumroad'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/ivankaraman',
      svg: 'icons/linkedin.svg',
      icon: LinkedinIcon,
      ariaLabel: 'Connect on LinkedIn'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/hackiku',
      svg: 'icons/github.svg',
      icon: GithubIcon,
      ariaLabel: 'View projects on GitHub'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@pipewriter.io',
      svg: 'icons/tiktok.svg',
      icon: GithubIcon,
      ariaLabel: 'Follow on TikTok'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/jzro_',
      svg: 'icons/instagram.svg',
      icon: Instagram,
      ariaLabel: 'Follow on Instagram'
    }
  ];

  const navItems = [
    { href: "/product", label: "Product" },
    { href: "/about", label: "About" },
    { href: "/ai", label: "AI" },
    { href: "/blog", label: "Blog" },
  ];
</script>

<footer class="w-full bg-slate-100 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-800">
  <div class="container px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- About -->
      <div class="lg:col-span-5 space-y-4">
        <div class="flex items-center gap-1">
          <div>✍️</div>
          <h3 class="text-2xl font-semibold">Pipewriter</h3>
        </div>
        <p class="text-muted-foreground text-sm max-w-xs">
          Professional website copy decks in Google Docs. Design-ready templates + sidebar app.
        </p>
        <div class="flex gap-6 mt-6">
          {#each socials as social}
            <a
              href={social.url}
              class="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={social.ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={social.svg} 
                alt={social.name}
                width="20"
                height="20"
                class="hover:scale-110 transition-transform duration-200"
                onerror="this.onerror=null; this.src='';"
              />
              <svelte:component 
                this={social.icon} 
                size={20} 
                class="hidden hover:scale-110 transition-transform duration-200"
              />
            </a>
          {/each}
        </div>
      </div>

      <!-- Links -->
      <div class="lg:col-span-3">
        <h4 class="text-2xl font-medium mb-4">Links</h4>
        <nav class="flex flex-col space-y-2 text-sm">
          {#each navItems as item}
            <a href={item.href} class="text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </a>
          {/each}
          <EarlyAccessButton size="sm" className="w-fit font-bold bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white" />
        </nav>
      </div>

      <!-- Updates -->
      <div class="lg:col-span-4">
        <h4 class="text-2xl font-medium mb-4">UX-up your writerly inbox</h4>
        <EmailForm size="sm" wrap={true} />
      </div>
    </div>

    <!-- Copyright -->
    <div class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
      <div class="text-sm text-muted-foreground">
        Copyalright © {year} Pipewriter | <a href="/terms" class="hover:underline">Terms</a> | <a href="/privacy" class="hover:underline">Privacy</a>
      </div>
    </div>
  </div>
</footer>