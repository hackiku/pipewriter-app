<!-- $lib/components/Footer.svelte -->
<script lang="ts">
  import { ArrowRight } from "lucide-svelte";
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
  // import SocialLink from "./cta/SocialLink.svelte";
  // import { contactModalStore } from "$lib/stores/contactModalStore";
  import { socialLinks, footerSections } from '$data/navigation';
  import { mainNavItems } from '$data/navigation';
  
  const year = new Date().getFullYear();
</script>

<footer class="w-full bg-slate-100 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-800">
  <div class="max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8">
    <!-- Main Grid with improved responsive layout -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
      <!-- Brand & Social - Optimized for all screen sizes -->
      <div class="lg:col-span-5 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="flex items-center gap-1">
            <div>✍️</div>
            <h3 class="text-2xl font-semibold">Pipewriter</h3>
          </div>
          <p class="text-muted-foreground text-sm max-w-xs">
            Professional website copy decks in Google Docs. Design-ready templates + sidebar app.
          </p>
          <div class="pt-2">
						<BuyButton
							size="sm"
							text="Get Access"
							source="footer"
							className="w-fit font-normal"
						/>
          </div>
        </div>

        <!-- Social Icons with improved spacing -->
        <div class="flex gap-4 mt-8">
          {#each socialLinks as social}
            <a
              href={social.url}
              class="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label={social.ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={social.svg}
                alt={social.name}
                class="w-5 h-5 hover:scale-110 transition-transform duration-200"
                onerror="this.onerror=null; this.src='';"
              />
            </a>
          {/each}
        </div>
      </div>

      <!-- Quick Links - Improved responsive behavior -->
      <div class="lg:col-span-3">
        <h4 class="text-lg font-medium mb-4">Quick Links</h4>
        <nav class="grid gap-2 text-sm">
          {#each mainNavItems as item}
            <a
              href={item.href}
              class="text-muted-foreground hover:text-foreground transition-colors w-fit"
              on:click={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
            >
              {item.label}
            </a>
          {/each}
        </nav>
      </div>

      <!-- Newsletter - Better spacing and alignment -->
      <div class="lg:col-span-4">
        <h4 class="text-lg font-bold mb-4">UX-up your inbox</h4>
        <EmailForm 
				  source="footer" 
				  buttonText="Loop me in" 
					size="sm"
					wrap={true}
				/>
      </div>
    </div>

    <!-- Copyright with consistent spacing -->
    <div class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
      <div class="text-sm text-muted-foreground">
        <span>Copyalright © {year} Pipewriter</span>
        <span class="mx-2">|</span>
        <a href="/terms" class="hover:underline">Terms</a>
        <span class="mx-2">|</span>
        <a href="/privacy" class="hover:underline">Privacy</a>
      </div>
    </div>
  </div>
</footer>