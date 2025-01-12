---
title: "Copywriting Components: A Writer's Take on Frontend Architecture"
date: "January 11, 2025"
category: "Building in Public"
excerpt: "Organizing components by copywriting purpose instead of UI function. A strange pattern emerges while speedrunning the Firefly Aerospace redesign, and what it means for writers in product development."
readingTime: "6 min read"
heroImage: "/images/blog/component-architecture.webp"
---


Just spent 2 days speedrunning a redesign of Firefly Aerospace's website. They're launching to the moon in 5 days (!!!), and it made me realize something interesting about how I structure components.

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
│   └── StackIcons.svelte
└── mission/
    ├── HexagonPlayer.svelte
    └── MissionBrief.svelte
```

Notice something strange? Instead of organizing by UI type (buttons, forms, modals), everything's grouped by copywriting purpose.

`cta/` = Components that drive action
`proof/` = Elements that build trust
`mission/` = Mission-specific content (duh)

I've been doing this unconsciously across projects and just now caught myself. Here's the same pattern in Chute Repack (my service for space startups):

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

The traditional way to organize components is by their UI function: /buttons, /forms, /modals. Makes sense if you're thinking in pixels.
But I'm thinking in conversion paths. When I need a "social proof" element, I don't care if it's a card or a grid or whatever - I care that it builds trust. When I need a call-to-action, the component type is secondary to its purpose.
It's like the difference between:

"I need a modal component" (UI-first thinking)
"I need something that captures leads" (purpose-first thinking)

## Writers as Product Architects
This is where it gets interesting. Traditional UX flows start with wireframes → copy. But what if we flipped it?
What if component architecture could start with conversion strategy?
Example from the Firefly project:

`<Hero>
  <proof.MissionTimeline />
  <cta.BookRideButton />
</Hero>`


The code reads like a sales sequence. Because that's exactly what it is.

## Implications for Product Development

Clearer Intent: When a new dev joins, they immediately understand what each component is for, not just what it looks like
Reusable Patterns: Copy-driven components are easier to adapt across projects because they're organized by purpose
Better Collaboration: Designers and writers can speak the same language - "we need a proof point here" is more useful than "we need a 3-column grid"

## An Experiment Worth Trying

I'm building this approach into Chute Repack, my 7-day website redesign service for space startups. Every component is organized by its role in the conversion funnel, not its UI pattern.
Want to see how it works? Check out the Firefly redesign preview (or book your own Repack if you're feeling brave).

Curious if anyone else structures their components this way. Writers, developers - what do you think? Drop a comment or DM me on Twitter.