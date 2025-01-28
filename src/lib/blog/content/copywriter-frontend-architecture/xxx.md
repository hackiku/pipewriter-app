---
title: "Copywriting Components: A Writer's Take on Frontend Architecture"
date: "January 11, 2025"
category: "Building in Public"
excerpt: "A story about component organization, rocket launches, and why writers might be the architects we need."
readingTime: "6 min read"
author: {
  name: "J.Z.",
  avatar: "/images/avatar.jpg"
}
---

<script>
  import CodeDemo from '$lib/blog/components/blocks/CodeDemo.svelte';
  import Hero from '$lib/(space)/content/Hero.svelte';
	import Disclaimer from '../../components/blocks/Disclaimer.svelte';
</script>

I caught myself doing something weird while rebuilding Firefly Aerospace's website. They're launching to the moon in 5 days, so naturally, I'm reorganizing component folders at 3 AM.
<Disclaimer />

## Origin Story

The strangest part? I didn't notice I was doing it wrong for months. Or maybe I was doing it right for the wrong reasons. Here's what I mean.

Most frontend developers organize components by what they are:

<CodeDemo language="bash">
components/
├── buttons/
├── forms/
├── modals/
└── cards/
</CodeDemo>

Makes sense. Clean. Logical. The way God and React intended.

## The Plot Twist

But here's how my folders looked:

<CodeDemo language="bash">
components/
├── cta/
│   ├── PrimaryButton.svelte
│   ├── BookModal.svelte
│   └── EmailForm.svelte
├── proof/
│   ├── MediaMentions.svelte
│   └── Testimonials.svelte
└── mission/
    ├── HexagonPlayer.svelte
    └── MissionBrief.svelte
</CodeDemo>

I was organizing components by their persuasion purpose. Not their UI function.

At first I thought this was just a copywriter's bad habit bleeding into code. But then I noticed something: these components were ridiculously easy to reuse across projects. When a new space startup needed a website, I wasn't thinking "which modal component should I copy?" I was thinking "where do we need proof points?"

## The System

The code started reading like a sales sequence:

<CodeDemo language="svelte">
<Hero />
<!-- <Hero>
  <proof.MissionTimeline />
  <cta.BookRideButton />
</Hero> -->
</CodeDemo>

This isn't just syntactic sugar. It's a different way of thinking about component architecture. Instead of organizing by what things are, we organize by what they're trying to accomplish.

It's the difference between:

* "I need a modal component that follows UI best practices"
* "I need something that captures leads without breaking flow"

The first approach starts with the UI pattern. The second starts with the user's journey. One is about pixels. The other is about purpose.

## The Big Picture

This matters because most websites don't fail because of bad components. They fail because no one thought about why those components exist in the first place.

When I was just writing copy, this drove me crazy. You'd get pixel-perfect wireframes with zero thought about user flow. Beautiful modals that no one would ever click. Components searching for a purpose.

But if you start with purpose first, something interesting happens. The components become opinionated. They have built-in intent. A `<proof.CustomerQuote />` isn't just a card with a quote – it's a strategic element that knows where it belongs in the conversion flow.

## The Implementation

I'm building this approach into Pipewriter's component library. Every component is organized by its role in the user journey, not its UI pattern. Because when you're launching rockets (or websites), you need clarity of purpose more than you need pretty pixels.

The Firefly project was the perfect test case. They don't need generic components. They need pieces that fit together to tell the story of: "We're going to the moon, want to come along?"

You can see it live at [space.pipewriter.io](https://space.pipewriter.io). The components are organized by their persuasion purpose, the code reads like a story, and most importantly – it helps Firefly sell more rocket launches.

## Looking Forward

Curious if this resonates with other developers (especially the ones who caught themselves organizing things "wrong" before realizing it might be right). Have you found yourself breaking convention in ways that ended up making more sense?

Let me know what you think in the comments below or reach out on Twitter. I'd love to hear your thoughts on this approach to component architecture.

Want to try this organization system in your own projects? Check out the [Pipewriter Component Library](https://pipewriter.io/components) for examples and starter templates.