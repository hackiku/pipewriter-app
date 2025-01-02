<!-- src/lib/pages/free/components/editor/Editable.svelte -->

<script lang="ts">
  import { editorStore } from '../../stores/editorStore';
  import type { EditableProps } from './types';
  
  export let path: EditableProps['path'];
  export let value: EditableProps['value'];
  export let className: EditableProps['className'] = '';
  
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
</script>

<div
  contenteditable="true"
  class="outline-none {className}"
  on:input={handleInput}
  on:focus={handleFocus}
  on:blur={handleBlur}
>
  {value}
</div>

<style>
  div:focus {
    background: rgba(var(--primary), 0.1);
    border-radius: 4px;
    padding: 0 0.25rem;
    margin: 0 -0.25rem;
  }
</style>