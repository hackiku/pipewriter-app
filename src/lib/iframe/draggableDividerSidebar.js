// src/lib/app/draggableDividerSidebar.js

export function draggableDividerSidebar(node) {
  let startY;
  let startHeight;

  function onMouseDown(event) {
    startY = event.clientY;
    const elementsDropper = node.previousElementSibling;
    startHeight = elementsDropper.offsetHeight;

    function onMouseMove(event) {
      const dy = event.clientY - startY;
      const newHeight = startHeight + dy;
      elementsDropper.style.height = `${newHeight}px`;
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  node.addEventListener('mousedown', onMouseDown);

  // Clean up when the node is destroyed or no longer used
  return {
    destroy() {
      node.removeEventListener('mousedown', onMouseDown);
    },
  };
}
