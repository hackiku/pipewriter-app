// $lib/actions/click-outside.ts

interface ClickOutsideOptions {
  enabled: boolean;
  callback: (event: MouseEvent) => void;
}

export function clickOutside(node: HTMLElement, options: ClickOutsideOptions) {
  const handleClick = (event: MouseEvent) => {
    if (!options.enabled) return;
    
    const target = event.target as Node;
    if (!node.contains(target)) {
      options.callback(event);
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    update(newOptions: ClickOutsideOptions) {
      options = newOptions;
    },
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}