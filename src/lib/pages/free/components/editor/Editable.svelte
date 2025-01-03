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
  class="outline-none rounded transition-all duration-300 px-0
         focus:px-2 focus:-mx-2
         {className}"
  on:input={handleInput}
  on:focus={handleFocus}
  on:blur={handleBlur}
>
  {value}
</div>