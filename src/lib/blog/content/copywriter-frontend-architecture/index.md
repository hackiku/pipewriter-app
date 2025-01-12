---
title: "Copywriting Components: A Writer's Take on Frontend Architecture"
date: "January 11, 2025"
category: "Building in Public"
excerpt: "Sometimes the best insights come from noticing what you're doing wrong. Or in this case, what you're doing differently without realizing it. A story about component organization, rocket launches, and why writers might be the architects we need."
readingTime: "6 min read"
author: {
  name: "Ivan Karaman",
  avatar: "/path/to/avatar.jpg"
}
---

<script>
  // import CodeDemo from '$lib/blog/components/blocks/CodeDemo.svelte';
  import CodeDemo from '$lib/blog/components/blocks/CodeDemo.svelte';
</script>

I caught myself doing something weird while rebuilding Firefly Aerospace's website. They're launching to the moon in 5 days, so naturally, I'm reorganizing component folders at 3 AM.

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

<CodeDemo language="python">
def langy():
	keys_list = ['A', 'B', 'C']
	return
</CodeDemo>

I was organizing components by their persuasion purpose. Not their UI function.

At first I thought this was just a copywriter's bad habit bleeding into code. But then I noticed something: these components were ridiculously easy to reuse across projects. When a new space startup needed a website, I wasn't thinking "which modal component should I copy?" I was thinking "where do we need proof points?"

The code started reading like a sales sequence:

<CodeDemo language="svelte">
export let banana = '';
<!-- <Hero>
  <proof.MissionTimeline />
  <cta.BookRideButton />
</Hero> -->
</CodeDemo>

It's the difference between:

- "I need a modal component that follows UI best practices"
- "I need something that captures leads without breaking flow"

The first approach starts with the UI pattern. The second starts with the user's journey. One is about pixels. The other is about purpose.

This matters because most websites don't fail because of bad components. They fail because no one thought about why those components exist in the first place.

When I was just writing copy, this drove me crazy. You'd get pixel-perfect wireframes with zero thought about user flow. Beautiful modals that no one would ever click. Components searching for a purpose.

But if you start with purpose first, something interesting happens. The components become opinionated. They have built-in intent. A `<proof.CustomerQuote />` isn't just a card with a quote – it's a strategic element that knows where it belongs in the conversion flow.

I'm building this approach into Pipewriter's component library. Every component is organized by its role in the user journey, not its UI pattern. Because when you're launching rockets (or websites), you need clarity of purpose more than you need pretty pixels.

The Firefly project was the perfect test case. They don't need generic components. They need pieces that fit together to tell the story of: "We're going to the moon, want to come along?"

You can see it live at space.pipewriter.io. The components are organized by their persuasion purpose, the code reads like a story, and most importantly – it helps Firefly sell more rocket launches.

Curious if this resonates with other developers (especially the ones who caught themselves organizing things "wrong" before realizing it might be right). Let me know what you think!
