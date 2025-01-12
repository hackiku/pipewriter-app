---
title: "MDSveX + Shadcn = Developer Blog Heaven"
date: "January 12, 2025"
category: "Building in Public"
excerpt: "Quick notes on how I built this blog. Spoiler alert: It's all Svelte components inside markdown, because why choose between prose and interactivity?"
---

<script>
  import Timer from '$lib/components/cta/Timer.svelte';
  import GumroadUpsell from '$lib/blog/components/cta/GumroadUpsell.svelte';
  import SvelteRenderer from '$lib/blog/components/blocks/SvelteRenderer.svelte';
</script>

Just rebuilt the blog with MDSveX. The goal? Write in markdown but keep all the interactive goodies from my component library.

## Why This Stack

I needed markdown for content (duh), but also wanted to keep my entire UI kit at hand. MDSveX lets you do both:

<SvelteRenderer 
  component={Timer} 
  props={{ 
    endDate: "2025-01-20", 
    text: "Beta Access Closes In" 
  }} 
/>

## Components in Markdown?

Yep. And they work exactly like in your app:

<GumroadUpsell>
  Writing this post using the actual components I'm selling. Meta enough?
</GumroadUpsell>

## The Setup

Three key pieces:
1. MDSveX processes markdown
2. Shadcn/UI provides the design system
3. Custom components add the spice

That's it. No content platforms, no heavy CMS. Just files and components.

<SvelteRenderer 
  component={Timer} 
  props={{ 
    endDate: "2025-02-01",
    size: "sm",
    text: "Time to next feature"
  }}
  showSource={true}
/>

## What's Next

Adding more blocks:
- Code previews
- Live demos
- API docs

Because if you're selling dev tools, your blog better be a power tool too.