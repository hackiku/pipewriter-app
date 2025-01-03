<!-- // src/lib/pages/free/components/editor/Editable.svelte -->
<script lang="ts">
  import { editorStore } from '../../stores/editorStore';
  import type { EditableProps } from './types';
  
  export let path: EditableProps['path'];
  export let value: EditableProps['value'];
  export let className = '';
  export let placeholder = 'Type something...';
  export let multiline = false;
  
  const fieldId = path.join('-');
  
  function handleInput(event: Event) {
    const target = event.target as HTMLElement;
    editorStore.updateContent(path, target.innerText);
  }
  
  function handleFocus() {
    editorStore.setEditingField(fieldId);
  }
  
  function handleBlur() {
    editorStore.setEditingField(null);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!multiline && event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLElement).blur();
    }
  }
</script>

<div
  contenteditable="true"
  class="outline-none rounded transition-all duration-300
         focus:px-2 focus:-mx-2 empty:before:content-[attr(data-placeholder)]
         empty:before:text-muted-foreground/50 {className}"
  data-placeholder={placeholder}
  on:input={handleInput}
  on:focus={handleFocus}
  on:blur={handleBlur}
  on:keydown={handleKeyDown}
>
  {value || ''}
</div>

<style>
  div {
    min-height: 1em;
  }
  
  /* Selection styling */
  ::selection {
    background: rgb(var(--primary) / 0.2);
  }
  
  /* Fix emoji selection */
  div:first-child::selection {
    background: transparent;
  }
  
  @media (max-width: 768px) {
    div {
      -webkit-tap-highlight-color: rgb(var(--primary) / 0.1);
    }
  }
</style>