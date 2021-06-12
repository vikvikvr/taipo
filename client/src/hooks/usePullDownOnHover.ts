import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMouseHover } from 'hooks/useMouseHover';

// custom hook to animate a component
// sliding it down when it's hovered

export function usePullDownOnHover(ignoreOpacity?: boolean) {
  const container = useRef(null);
  const { isHovered } = useMouseHover(container);
  useEffect(pullDownOnHover, [isHovered, ignoreOpacity]);

  function pullDownOnHover() {
    if (!container.current) {
      return;
    }
    const lowOpacity = ignoreOpacity ? undefined : 0.7;
    gsap.fromTo(
      container.current,
      { opacity: isHovered ? lowOpacity : 1 },
      {
        translateY: isHovered ? '0.4em' : 0,
        ease: 'power3.out',
        opacity: isHovered ? 1 : lowOpacity
      }
    );
  }

  return { container };
}
