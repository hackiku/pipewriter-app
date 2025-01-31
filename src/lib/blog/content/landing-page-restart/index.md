---
title: "Rebuilding a SaaS Landing Page at 3 AM"
date: "January 31, 2025"
category: "Engineering Log"
excerpt: "Technical notes on component architecture, hover states, and why I deleted a perfectly good prototype. Plus some 3 AM debugging wisdom."
readingTime: "7 min read"
author: {
  name: "Ivan K.",
  avatar: "/images/avatar.jpg"
}
---

<script>
  import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
  import ModeToggle from "$lib/components/nav/ModeToggle.svelte";
  import Logo from "$lib/components/nav/Logo.svelte";
</script>

Had an editable landing page for a week. Cool demo, terrible conversion. Time to rebuild.

## The Problem

The homepage was this neat experiment where you could edit any text and export it. Sort of a meta-demo of what Pipewriter does. Engineers loved it. Everyone else just got confused.

Lesson: Just because you can make everything editable doesn't mean you should.

## The Fix

Currently rebuilding with patterns from a hush-hush project for a space industry client. Their requirements pushed our component architecture into something much cleaner.

Key changes:

```typescript
// Old structure - Too generic
components/
  buttons/
  inputs/
  layout/

// New structure - Purpose-driven
components/
  cta/
    BuyButton.svelte
    BuyDrawer.svelte
  nav/
    Logo.svelte
    MobileNav.svelte
```

## New Components

The mode toggle is probably my favorite piece. No borders, perfect circle, smooth transitions:

<ModeToggle />

```svelte
<button
  class="w-10 h-10 rounded-full 
         flex items-center justify-center
         hover:text-[#3644FE] dark:hover:text-[#B345ED]
         transition-colors duration-300"
>
  <Sun class="h-[1.2rem] rotate-0 scale-100 
             transition-transform duration-300
             dark:-rotate-90 dark:scale-0" />
  <Moon class="absolute h-[1.2rem] rotate-90 scale-0 
             dark:rotate-0 dark:scale-100" />
</button>
```

Buy button got interesting. It peeks into its drawer on hover:

<BuyButton size="default" text="Early Access" />

The peek effect happens through a simple state machine:

```typescript
interface DrawerState {
  isOpen: boolean;
  isPeeking: boolean;
  source: string | null;
  lastInteraction?: Date;
}

// Simple but effective hover handling
function handlePeek() {
  if (!isOpen) isPeeking = true;
}
```

## Architecture Notes

Three key decisions that made this work:

1. **Component coupling is okay when intentional**
The button knows about its drawer. That's not an abstraction leak, it's a feature.

2. **SSR needs explicit handling**
Everything touching `document` or `window` needs browser checks. Found this out the hard way.

3. **Transitions deserve types**
Duration constants shouldn't be magic numbers floating in components.

```typescript
const TRANSITIONS = {
  peek: {
    duration: 300,
    height: '98%',
  },
  drawer: {
    duration: 400,
    height: '85vh',
  }
} as const;
```

## Why This Matters

Previous landing page showed off the tech. New one shows what the tech can do for you. Big difference.

Using Claude 3.5 Sonnet to take notes while rebuilding. Good debugger, better rubber duck. Making me document decisions I'd usually just commit and forget.

## What's Next

Still need to:
- Fix mobile nav (half done)
- Add hero section variants
- Port more patterns from the space project

Overall the code's getting simpler. Fewer props, clearer purposes, better conversion paths. Sometimes the best engineering is just good product thinking.

Want to help test? The early access is still $59. Let's see what breaks.

## Random 3 AM Wisdom

- Dark mode should never flash light mode
- Drawers need better scroll lock handling
- ShadCN components don't like `class:` directives
- Never ship major UI changes on Friday
- Good UI should be boring
- Write more docs at 3 AM

More updates soon. Back to rebuilding.