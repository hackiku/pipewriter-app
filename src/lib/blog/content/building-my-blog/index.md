---
title: "Building My Blog: A Story of Discovering MDSvex"
date: "January 12, 2025"
category: "Building in Public"
excerpt: "When I realized I organize website components code with a copywriter's mind."
---

<script>
  import CodeDemo from '../../components/blocks/CodeDemo.svelte';
  import Disclaimer from '../../components/blocks/Disclaimer.svelte';
</script>

I just spent three hours trying to build a custom markdown renderer when I could have just used MDSvex. But you know what? Sometimes you need to build the wrong thing to appreciate the right one.

<Disclaimer />

## The Setup

Here's what my blog structure looked like before:

<CodeDemo language="bash">
tree lib/blog
lib/blog/
├── components/
│   ├── ArticleCard.svelte
│   └── BlogPost.svelte
└── utils/
    └── markdown.ts  # An over-engineered solution
</CodeDemo>

I was parsing markdown manually, building custom renderers, and generally doing way too much work. Then I discovered MDSvex, and everything changed.

## The MDSvex Revelation

Here's what made me fall in love with MDSvex - you can write Svelte components directly in your markdown:

<CodeDemo language="svelte">
{`<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Clicks: {count}
</button>`}
</CodeDemo>

That's not just a code block - it's a live component! And the best part? It's just markdown with superpowers.

## The New Architecture

Now my blog posts look like this:

```markdown
---
title: My Post
---

<script>
  import CodeDemo from '../components/CodeDemo.svelte';
</script>

Regular markdown here...

<CodeDemo code={`console.log('hello')`} />

More markdown...
```

Simple, clean, and powerful. No more wrestling with custom markdown parsers.

## What's Next

1. Move all posts to `content/` directory
2. Set up proper MDSvex config
3. Build some custom components for common patterns
4. Actually write more instead of rebuilding the blog engine

Sometimes the best architectural decisions come from realizing you're over-engineering something. In this case, MDSvex was the solution I needed but didn't know I was looking for.

Want to see how this post was written? Check out the source [here](https://github.com/your-repo/blog/content/building-my-blog/index.md).