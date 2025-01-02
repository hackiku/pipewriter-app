<!-- src/lib/pages/app/components/editor/EditableField.svelte -->
<script lang="ts">
  import { editorStore } from '../../stores/content';
  
  export let sectionId: string;
  export let fieldId: string;
  export let value: string;
  export let className = '';
  
  const fullFieldId = `${sectionId}-${fieldId}`;
  
  function handleInput(event: Event) {
    const target = event.target as HTMLElement;
    editorStore.updateContent(sectionId, fieldId, target.innerText);
  }
  
  function handleFocus() {
    editorStore.setEditingField(fullFieldId);
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
  }
</style>