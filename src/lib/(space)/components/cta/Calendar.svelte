<!-- src/lib/(space)/components/cta/Calendar.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { spaceFormStore } from '../../stores/spaceFormStore';
  
  declare global {
    interface Window {
      Cal?: any;
    }
  }

  export let calLink = "pipewriter/space";
  export let elementId = "space-calendar"; // Allow custom ID per instance
  let calElement: HTMLDivElement;
  let initialized = false;
  
  // Subscribe to form store for prefilling
  $: formData = $spaceFormStore.data;
  
  function initializeCalendar() {
    if (typeof window === 'undefined' || initialized) return;

    initialized = true;

    (function (C, A, L) {
      let p = function (a: any, ar: IArguments) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // Initialize with unique namespace per instance
    const namespace = elementId.replace(/-/g, '_');
    window.Cal("init", namespace, {
      origin: "https://cal.com",
      prefill: {
        email: formData.email,
        notes: `Website: ${formData.website}\nAdditional Info: ${formData.comment}`
      }
    });

    // Set up the inline embed
    window.Cal.ns[namespace]("inline", {
      elementOrSelector: `#${elementId}`,
      calLink,
      config: {
        layout: "week_view",
        hideEventTypeDetails: false,
        theme: "dark",
        styles: {
          branding: {
            brandColor: "#4f46e5"
          }
        }
      }
    });
  }

  onMount(() => {
    // Small delay to ensure DOM is ready in modal context
    setTimeout(initializeCalendar, 100);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined' && window.Cal && initialized) {
      try {
        const namespace = elementId.replace(/-/g, '_');
        window.Cal.ns[namespace]("destroy");
        initialized = false;
      } catch (e) {
        console.error('Error cleaning up Cal:', e);
      }
    }
  });
</script>

<div 
  {elementId}
  id={elementId}
  bind:this={calElement}
  class="w-full h-full overflow-auto rounded-lg border bg-white/5"
/>