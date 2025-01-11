<!-- src/lib/pages/space/components/cta/Calendar.svelte -->

<!-- src/lib/components/Calendar.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  declare global {
    interface Window {
      Cal?: any;
    }
  }

  export let calLink = "pipewriter/writer";
  let calElement: HTMLDivElement;
  
  onMount(() => {
    if (typeof window === 'undefined') return;

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

    // Initialize Cal with a namespace
    window.Cal("init", "aerospace", {
      origin: "https://cal.com"
    });

    // Set up the inline embed with the namespace
    setTimeout(() => {
      window.Cal.ns.aerospace("inline", {
        elementOrSelector: "#cal-booking",
        calLink,
        config: {
          layout: "month_view",
          hideEventTypeDetails: false,
          theme: "light"
        }
      });
    }, 200);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined' && window.Cal) {
      try {
        window.Cal("destroy");
      } catch (e) {
        console.error('Error cleaning up Cal:', e);
      }
    }
  });
</script>

<div 
  id="cal-booking"
  bind:this={calElement}
  class="w-full h-full overflow-auto rounded-lg border bg-white"
/>