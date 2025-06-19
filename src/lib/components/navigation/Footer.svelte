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
</script>

<footer class="relative bg-background border-t border-border/50">
  <!-- Background pattern -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 pointer-events-none" />
  
  <div class="relative max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    
    <!-- Main footer content - 3 columns -->
    <div class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Column 1: Logo and description -->
        <div>
          <LogoSystem size="lg" variant="full" />
          <p class="text-muted-foreground leading-relaxed max-w-sm mt-4">
            Wireframes for writers in Google Docs
          </p>
        </div>
        
        <!-- Column 2: Links organized in two sections -->
        <div class="grid grid-cols-2 gap-8 text-sm">
          <!-- Company column -->
          <div class="space-y-4">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-foreground">
              COMPANY
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
              LEGAL
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
        
        <!-- Column 3: Email signup -->
        <div>
          <h3 class="text-xl font-semibold">UX-up your inbox</h3>
          <div class="mt-4">
            <EmailForm 
              buttonText="Subscribe"
              size="xs"
              wrap={true}
              source="Footer"
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom bar with copyright and social icons -->
    <div class="py-8 border-t border-border/20">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Copyright -->
        <p class="text-sm text-muted-foreground">
          Copyalright © {currentYear} Pipewriter
        </p>
        
        <!-- Social icons -->
        <div class="flex items-center gap-4">
          {#each socialLinks as social}
            <SocialLink {...social} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</footer>