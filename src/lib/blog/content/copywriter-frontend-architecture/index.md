---
title: "Copywriting Components: A Writer's Take on Frontend Architecture"
date: "January 11, 2025"
category: "Building in Public"
excerpt: "Component architecture should follow persuasion architecture. Organizing components by copywriting purpose instead of UI function."
readingTime: "6 min read"
heroImage: "/images/blog/component-architecture.webp"
---

Just spent 2 days & nights speedrunning a redesign of Firefly Aerospace's website. They're off to the Moon in 5 days, so perfect timing for a space dev service I've been cooking. The speedrun made me realize something interesting about how I structure components — which I had taken for granted.

## A Weird Pattern Emerges
Look at this folder structure:

```
components/
├── cta/
│   ├── PrimaryButton.svelte
│   ├── BookModal.svelte
│   └── EmailForm.svelte
├── proof/
│   ├── MediaMentions.svelte
│   ├── Testimonials.svelte
│   └── UserAvatars.svelte
└── mission/
    ├── HexagonPlayer.svelte
    └── MissionBrief.svelte
```

Notice something strange? Instead of organizing by UI type (buttons, forms, modals), everything's grouped by copywriting purpose.

`cta/` = Components that drive action
`proof/` = Elements that build trust
`mission/` = Mission-specific content

I've been doing this unconsciously across projects and just now caught myself. Here's the same pattern in Chute Repack (the aerospacey webdev service I mentioned):

```
components/
├── cta/
│   ├── SpaceButton.svelte
│   └── SpaceForm.svelte
├── proof/
│   ├── Testimonials.svelte
│   └── StackIcons.svelte
└── products/
    ├── ProductCard.svelte
    └── ProductModal.svelte
```

## Why Does This Work?

The traditional way to organize components is by their UI function: /buttons, /forms, /modals. Makes sense if you're thinking in pixels or code architecture.
But I'm thinking in conversion paths. When I need a "social proof" element, I don't care if it's a card or a grid or whatever - I care that it builds trust. When I need a call-to-action, the component type is secondary to its purpose.
It's like the difference between:

"I need a modal component" (UI-first thinking)
"I need something that captures leads" (purpose-first thinking)

## Stretching that flow

You're creating self-contained functional components (like Hero, Pricing) that handle their specific persuasive function, while using the parent LandingPage to control layout, flow, and overall narrative structure.
This is actually quite elegant because:

Your components remain focused on their core persuasive function without needing to know about their layout context
The LandingPage component becomes your "persuasion orchestrator"
You gain reusability - your Pricing component can be used in a modal or directly in the page flow

The section containers in LandingPage provide the positioning, background, and spacing context, while the imported components focus purely on their persuasive content and interactions. This creates a clean separation of concerns where:


## Writers as Product Architects
This is where it gets interesting. Traditional UX flows start with wireframes → copy. But what if we flipped it?
What if component architecture could start with conversion strategy?
Example from the Firefly project:


```
<Hero>
  <proof.MissionTimeline />
  <cta.BookRideButton />
</Hero>
```


The code reads like a sales sequence. Because that's exactly what it is.

## Implications for Product Development

Clearer Intent: When a new dev joins, they immediately understand what each component is for, not just what it looks like
Reusable Patterns: Copy-driven components are easier to adapt across projects because they're organized by purpose
Better Collaboration: Designers and writers can speak the same language - "we need a proof point here" is more useful than "we need a 3-column grid"

## How's all this Pipewriting?

While juggling GDocs wireframes and client work and wild moonshots, I keep quietly building a webapp that turns writing into code. I'll incorporate these learnings and open them up to y'all to see and use in your own projects blending UX storytelling with product design.

Curious if anyone else structures their components this way. Writers, developers - what do you think? Slide into DMs and let's get writey.