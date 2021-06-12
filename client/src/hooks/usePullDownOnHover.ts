import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMouseHover } from 'hooks/useMouseHover';

// custom hook to animate a component
// sliding it down when it's hovered

export function usePullDownOnHover() {
  const container = useRef(null);
  const { isHovered } = useMouseHover(container);
  useEffect(pullDownOnHover, [isHovered]);

  function pullDownOnHover() {
    if (!container.current) {
      return;
    }
    gsap.fromTo(
      container.current,
      { opacity: isHovered ? 0.7 : 1 },
      {
        translateY: isHovered ? '0.4em' : 0,
        ease: 'power3.out',
        opacity: isHovered ? 1 : 0.7
      }
    );
  }

  return { container };
}
