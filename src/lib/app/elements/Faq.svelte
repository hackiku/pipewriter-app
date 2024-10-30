<!-- OLD FILE -->
<!-- lib/sections/Faq.svelte -->
<script>
  import { onMount } from 'svelte';

  let openFaqIndex = 0;

  function toggleFaq(index) {
    openFaqIndex = openFaqIndex === index ? -1 : index;
  }

  const faqs = [
    {
      question: 'What’s a Pipewriter?',
      answer:
        'It’s basically Google Docs hacked into a design app for writers. You use it to build fancy-looking website wireframes and 10x your copy decks. You get fancy formatted templates Pipewriter is a template and Workspace add-on for Google Docs that you use to write wireframes of websites and landing pages. It’s clean, modern, and aimed at top-tier copywriters who know the power of UX.'
    },
    {
      question: 'Is it skibidi?',
      answer:
        'It’s basically Google Docs hacked into a design app for writers. You use it to build fancy-looking website wireframes and 10x your copy decks. You get fancy formatted templates Pipewriter is a template and Workspace add-on for Google Docs that you use to write wireframes of websites and landing pages. It’s clean, modern, and aimed at top-tier copywriters who know the power of UX.'
    },
    {
      question: 'Just... why Google Docs?',
      answer:
        'Google Docs design is the new orange. Also, it’s great: Everyone and their dogs use Docs (yo), You’re a writer. It has word count, thesaurus and all the juicy things you know & love, Clients know how to leave a damn comment in there, Wireframes should be simple and focus on storytelling. Docs forces you to keep things simple. With that said, the hackiness of it all is not lost on me. Takes a wee bit of getting used to. But when I started to play...'
    },
    {
      question: 'Who’s this for?',
      answer:
        'It’s for writers. Specifically, web copywriters with a SaaS-sy focus who know the power of UX for conversion (and whose clients regularly require wireframing work anyway). The template is formatted to remind you to write clean, concise short-form copy. And it looks darn professional and hot. See the samples to go bonkers.'
    },
    {
      question: 'Is there a free version?',
      answer:
        'For the template? No free amigo. It’s a huge UI kit and every $ funds development of a killer writing app. You can see the locked doc to see how it works (you’ll love it). You can also try the beta app free forever. It’s buggy and limited, but gets the job done and it’s fun to play with.'
    },
    {
      question: 'I still really wanna get it for free',
      answer:
        'You can pirate it. It’s mega popular and used by stars like Aston Kutcher and Mia Khalifa. Seriously though, send your writing portfolio to ivan@pipewriter.io and I’m sure we can... come to an ... arrangement 😏 I’m lowkey hiring writers anyway.'
    },
    {
      question: 'Any refund policy?',
      answer:
        'At the moment it’s ‘you buy it you keep it’ (Incoterms CFR chapter 11). Lawyer up, I’m too sleep deprived to care. This might change in the near future though, so you stay tuned. The email list is great for that, and it’s fun for the whole family.'
    },
    {
      question: 'Pipewriter... like Pied Piper?',
      answer:
        'For the record, F. asked first. Officially, it’s a mix of typewriter, pipe, and pipeline. The digital era’s writing tool, where copywriting is piped | (unix command) into the product pipeline. There’s an unofficial story, too.'
    },
    {
      question: 'Who’s behind this?',
      answer:
        'I have no name, but you shall adress me as Swarm. JK, I’m Ivan, longtime tech copywriter. I made this product for myself because I hate clicking around Figma to edit a bit of text. Now I’ve remade it to be fancier and added AI, so I’m selling it to you. Get to know me by typing into the sweet, sweet box below 👇'
    }
  ];
</script>

{#each faqs as faq, index}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="boxGrid faq-container border-2 border-[#4A4A4A] bg-[#272727]"
    on:click={() => toggleFaq(index)}
  >
    <div class="flex justify-between items-center">
      <h4 class="font-semibold">{faq.question}</h4>
      <span class={openFaqIndex === index ? 'rotate' : 'normal'}>▶</span>
    </div>
    {#if openFaqIndex === index}
      <div class="faq-answer">
        <p>{faq.answer}</p>
      </div>
    {/if}
  </div>
{/each}

<style>
  .faq-container {
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.75rem; /* equivalent to rounded-xl */
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .faq-answer {
    padding: 1rem;
  }

  .rotate {
    transform: rotate(90deg);
    transition: transform 0.3s ease;
  }

  .normal {
    transition: transform 0.3s ease;
  }
</style>
