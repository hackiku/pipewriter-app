<!-- src/lib/components/navigation/Footer.svelte -->
<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';
  import LogoSystem from '../branding/LogoSystem.svelte';
  import SocialLink from '../branding/SocialLink.svelte';
  import EmailForm from '../cta/email/EmailForm.svelte';
  import { mainNavItems, socialLinks } from '$data/navigation';
  
  const currentYear = new Date().getFullYear();
  
  const companyLinks = [
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ];
  
  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];
  
  const productLinks = [
    { href: 'https://workspace.google.com/marketplace', label: 'Google Workspace', external: true },
    { href: '/early', label: 'Early Access' },
  ];
</script>

<footer class="relative bg-background border-t border-border/50">
  <!-- Background pattern -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 pointer-events-none" />
  
  <div class="relative max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    
    <!-- Main footer content -->
    <div class="py-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        <!-- Brand column -->
        <div class="lg:col-span-2 space-y-6">
          <LogoSystem size="lg" />
          <p class="text-muted-foreground leading-relaxed max-w-sm">
            Wireframes for writers in Google Docs
          </p>
          
          <!-- Social links -->
          <div class="flex items-center gap-4">
            {#each socialLinks as social}
              <SocialLink {...social} />
            {/each}
          </div>

          <!-- Email form on mobile (after social links) -->
          <div class="lg:hidden">
            <div class="space-y-4">
              <h3 class="text-2xl font-semibold">UX-up your inbox</h3>
              <!-- <p class="text-muted-foreground text-sm">
                Get updates on new features, templates, and UX writing tips.
              </p> -->
              <EmailForm 
                buttonText="Subscribe"
                size="sm"
                wrap={true}
                source="Footer Mobile"
                className="max-w-sm"
              />
            </div>
          </div>
        </div>
        
        <!-- Navigation columns -->
        <div class="grid grid-cols-2 gap-8 text-sm">
          <!-- Company column -->
          <div class="space-y-4">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <nav class="space-y-2">
              {#each companyLinks as link}
                <a
                  href={link.href}
                  class="block text-muted-foreground hover:text-foreground
                         transition-colors duration-200"
                >
                  {link.label}
                </a>
              {/each}
            </nav>
          </div>
          
          <!-- Legal column -->
          <div class="space-y-4">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <nav class="space-y-2">
              {#each legalLinks as link}
                <a
                  href={link.href}
                  class="block text-muted-foreground hover:text-foreground
                         transition-colors duration-200"
                >
                  {link.label}
                </a>
              {/each}
            </nav>
          </div>
        </div>

        <!-- Email form on desktop (bottom-right, inline with social) -->
        <div class="hidden lg:block">
          <div class="space-y-4">
            <h3 class="text-2xl font-semibold">UX-up your inbox</h3>
            <!-- <p class="text-muted-foreground text-sm leading-relaxed">
              Get updates on new features, templates, and UX writing tips.
            </p> -->
            <EmailForm 
              buttonText="Subscribe"
              size="sm"
              wrap={true}
              source="Footer Desktop"
              className="max-w-sm"
            />
          </div>
        </div>
      </div>

      <!-- Product row (on its own on smaller screens) -->
      <!-- <div class="mt-12 pt-8 border-t border-border/20">
        <div class="space-y-4">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-foreground">
            Product
          </h3>
          <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {#each productLinks as link}
              <a
                href={link.href}
                class="flex items-center gap-1 text-muted-foreground hover:text-foreground
                       transition-colors duration-200 group"
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
                {#if link.external}
                  <ExternalLink class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                {/if}
              </a>
            {/each}
          </nav>
        </div>
      </div> -->
    </div>
    
    <!-- Bottom bar -->
    <div class="py-8 border-t border-border/20">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-muted-foreground">
          Copyalright © {currentYear} Pipewriter. All rights reserved.
        </p>
        
        <div class="flex items-center gap-6 text-sm text-muted-foreground">
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            All systems operational
          </span>
          <span>Made with ❤️ for writers</span>
        </div>
      </div>
    </div>
  </div>
</footer>