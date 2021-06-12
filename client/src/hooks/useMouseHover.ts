import { useEffect, useState, useCallback } from 'react';

// custom hook to access an element's hover state
// from within a component
// (mostly used for animation purposes)

export function useMouseHover(container: React.RefObject<any>) {
  const [isHovered, setIsHovered] = useState(false);
  const setTrue = useCallback(() => setIsHovered(true), []);
  const setFalse = useCallback(() => setIsHovered(false), []);
  useEffect(() => {
    const { current } = container;
    current?.addEventListener('mouseenter', setTrue);
    current?.addEventListener('mouseleave', setFalse);
    return () => {
      current?.removeEventListener('mouseenter', setTrue);
      current?.removeEventListener('mouseleave', setFalse);
    };
  }, [container, setTrue, setFalse]);

  return { isHovered };
}
