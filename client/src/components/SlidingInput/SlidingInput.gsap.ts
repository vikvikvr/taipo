import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { usePullDownOnHover } from 'hooks/usePullDownOnHover';

export function useAnimation(isActive: boolean) {
  useEffect(swapIcon, [isActive]);
  const { container: iconRef } = usePullDownOnHover();
  const input = useRef(null);
  const inactive = useRef(null);
  const active = useRef(null);
  // TODO: fix input text color -> add ref to input element

  function swapIcon() {
    if (isActive) {
      gsap.to(inactive.current, { opacity: 0, y: '-2em', fill: '#ffffff' });
      gsap.to(active.current, { opacity: 1, y: 0, fill: '#ffffff' });
      gsap.to(input.current, { background: '#009688', color: '#ffffff' });
    } else {
      gsap.to(inactive.current, { opacity: 1, y: 0, fill: '#515151' });
      gsap.to(active.current, { opacity: 0, y: '2em', fill: '#515151' });
      gsap.to(input.current, { background: '#ffffff', color: '#515151' });
    }
  }

  return { iconRef, input, inactive, active };
}
