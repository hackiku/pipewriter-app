# Building a Professional Prompt Library: From Firebase Chaos to Writer-Friendly UX

*June 2, 2025 - Devlog #3*

Today was one of those coding sessions where everything clicked into place. What started as debugging empty prompt dropdowns ended with a complete, professional-grade AI prompt management system for writers. The kind of interface that would make Notion jealous.

## 🔥 The Firebase Permission Wall

The morning began with a classic Firebase gotcha. Our beautifully seeded prompt library was sitting there in the emulator, 19 prompts ready to help writers craft better content, but our React components were showing absolutely nothing. The dreaded empty state.

```bash
curl "http://localhost:8080/v1/projects/pipewriter/databases/(default)/documents/prompts"
{"error":{"code":403,"message":"false for 'list' @ L11","status":"PERMISSION_DENIED"}}
```

The issue? Our Firestore security rules were blocking authenticated users from reading system prompts. A simple fix, but it revealed something deeper about our architecture:

```javascript
// The fix that unlocked everything
match /prompts/{promptId} {
  allow read: if request.auth != null;
  allow write: if false; // System prompts stay read-only
}
```

Sometimes the biggest breakthroughs come from the smallest fixes.

## 🧱 The Data Architecture Decision

With data flowing, we faced a crucial architectural choice. How do you handle **user customization** without breaking **system updates**? The pattern we settled on is elegant in its simplicity:

```
📁 System Prompts (Global)
├── /prompts/{id}                    ← Read-only professional prompts
└── /prompts/_analytics              ← Usage statistics

👤 User Prompts (Per-User)  
├── /users/{uid}/prompts/{id}        ← Custom prompts + system overrides
├── /users/{uid}/deleted_prompts/    ← Soft deletes with restore
└── /users/{uid}/settings/prompts    ← User preferences
```

This **system + user override pattern** means writers get all our professional prompts by default, but can customize or create their own without losing access to updates. It's the best of both worlds: **curation** and **personalization**.

## 🎨 Designing for the 300px Sidebar

The real challenge wasn't technical—it was spatial. Google Docs sidebars are **exactly 300 pixels wide**. Every pixel counts when you're building a professional tool that writers will use dozens of times per day.

Our breakthrough came from embracing **horizontal scrolling** for categories instead of fighting it:

```svelte
<!-- Instead of cramped vertical tabs -->
<div class="border-b bg-muted/20">
  <div class="flex overflow-x-auto scrollbar-none gap-1 p-1">
    {#each categories as category}
      <button class="flex-shrink-0 px-3 py-1.5...">
        {category.label} ({category.count})
      </button>
    {/each}
  </div>
</div>
```

Suddenly we had infinite category space that felt natural on a narrow sidebar. **Writing**, **Code**, **Design**, **Custom**, **Deleted**—all accessible with a smooth swipe.

## 🔧 The Component Architecture That Scaled

The key insight was separating **concerns cleanly**:

- **PromptDropdown**: Orchestrates the entire experience
- **PromptList**: Handles the scrollable card interface  
- **PromptEditor**: Manages creation and editing
- **PromptControls**: Smart action bar that adapts to context

Each component has a **single responsibility** but works together seamlessly. The controls bar shows "Copy + Drop" for viewing prompts, but switches to "Save + Drop" when editing. The editor automatically inherits the selected category tab. The list seamlessly handles both system and custom prompts.

**[Try Pipewriter's prompt system yourself](https://pipewriter.com/signup)** - see how fast you can go from idea to polished content.

## 🗑️ Solving the Delete Problem

One of the trickiest UX challenges was **deletion**. Writers need to experiment with custom prompts, but they also need **safety nets**. Our solution: **soft deletes with professional restoration**.

When you delete a custom prompt, it moves to a "Deleted" tab where you can restore it with one click. But we went further—we added **professional AlertDialog confirmations** instead of browser `confirm()` popups:

```svelte
<AlertDialog.Root open={!!deletePromptId}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Delete Prompt?</AlertDialog.Title>
      <AlertDialog.Description>
        This will move the prompt to your deleted items. You can restore it later.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action onclick={confirmDelete}>Delete</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
```

The result feels **professional** and **safe**. Writers can experiment freely knowing they can always undo.

## ⚡ The Real-Time Update Challenge

With users creating, editing, and deleting prompts, we needed **instant UI updates** without complex state management. Our solution was surprisingly simple: **optimistic updates with server sync**.

```typescript
// Update UI immediately
filteredPrompts = await getFilteredPrompts();

// Then sync with server
await props.onPromptsUpdate();

// Refresh again to catch any server changes
filteredPrompts = await getFilteredPrompts();
```

The interface feels **instant** while staying **consistent** with the server. No spinners, no loading states—just smooth transitions.

## 🎯 Context-Aware Intelligence

The breakthrough moment was making the **category tabs** drive everything else. Select "Code" and the new prompt editor opens with "Code" pre-selected. The filtered list shows only code prompts. The "Add context" checkbox makes sense because code prompts often need HTML wireframe context.

This **contextual intelligence** makes the tool feel **thoughtful** rather than mechanical. Writers don't have to think about categories—they just flow from tab to editor to action.

## 🚀 The 10x Better Promise

When we started, Pipewriter had already made $350 with a bound script version. But this new interface isn't just **better**—it's **10x better**:

- **Professional UI** that feels native to Google Docs
- **Instant actions** with copy, drop, and context options
- **Safe experimentation** with soft deletes and restore
- **Smart categorization** that guides the writing process
- **Unlimited customization** while preserving professional defaults

## 💭 Reflections on Building for Writers

There's something special about building tools for **creators**. Writers are **detail-oriented** (they notice every pixel), **workflow-driven** (they need tools that disappear), and **productivity-focused** (they measure value in words-per-minute, not features-per-screen).

Our prompt system succeeds because it **amplifies creativity** rather than adding complexity. A writer can go from "I need better UX copy" to polished microcopy in **three clicks**: select prompt, add context, drop to document.

That's the magic of **well-designed productivity tools**—they don't just save time, they **unlock better work**.

## 🔮 What's Next

The foundation is solid, but the vision is bigger. We're building toward:

- **Team collaboration** with shared prompt libraries
- **AI-powered suggestions** based on writing context  
- **Usage analytics** to surface your most effective prompts
- **Template generation** from successful writing patterns
- **Integration ecosystem** with other writing tools

But the core insight remains: **great tools disappear**. The best interface is the one writers stop noticing because it just **works**.

**[Ready to transform your writing workflow?](https://pipewriter.com/signup)** Join the writers who are already using Pipewriter to create better content, faster.

## Technical Wins

- **Firebase + SvelteKit 5** architecture handling real-time updates
- **System + user override pattern** for sustainable customization
- **300px-optimized interface** design for Google Docs integration
- **Soft delete with restore** for safe experimentation
- **Context-aware categorization** driving intelligent defaults
- **Professional AlertDialog confirmations** replacing browser popups
- **Horizontal scrolling tabs** maximizing narrow sidebar space

## The Bigger Picture

This prompt system is just the beginning. We're not just building a writing tool—we're building **infrastructure for better content creation**. The patterns we've established here—user customization, professional defaults, context awareness, safe experimentation—these will scale to every feature we add.

The goal isn't to replace writers. It's to **amplify their craft**. To turn good writers into **great writers**, and great writers into **unstoppable creators**.

That's the Pipewriter vision: **technology that makes human creativity unstoppable**.

---

*Next up: Implementing the "Drop with context" feature that converts wireframes to HTML and includes them with prompts. The magic that makes UX writing 10x faster.*