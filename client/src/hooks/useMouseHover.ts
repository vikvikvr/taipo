import { useEffect, useState } from 'react';

// allows to access the hover state from within a component

export function useMouseHover(container: React.RefObject<any>) {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(attachListeners, [container]);

  function attachListeners() {
    const { current } = container;
    current?.addEventListener('mouseenter', setTrue);
    current?.addEventListener('mouseleave', setFalse);
    return () => {
      current?.removeEventListener('mouseenter', setTrue);
      current?.removeEventListener('mouseleave', setFalse);
    };
  }

  function setTrue() {
    setIsHovered(true);
  }

  function setFalse() {
    setIsHovered(false);
  }

  return { isHovered };
}
