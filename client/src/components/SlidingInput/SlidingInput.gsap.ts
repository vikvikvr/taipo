import { useEffect, useRef } from 'react';
import { mix, gsap } from 'services/animationService';
import { usePullDownOnHover } from 'hooks/usePullDownOnHover';

export function useAnimation(isActive: boolean) {
  useEffect(swapIcon, [isActive]);
  const { container: iconRef } = usePullDownOnHover();
  const input = useRef(null);
  const inactive = useRef(null);
  const active = useRef(null);

  function swapIcon() {
    if (isActive) {
      gsap.to(inactive.current, {
        ...mix('hidden', 'topBig'),
        fill: '#ffffff'
      });
      gsap.to(active.current, { ...mix('showing', 'resetY'), fill: '#ffffff' });
      gsap.to(input.current, { background: '#009688', color: '#ffffff' });
    } else {
      gsap.to(inactive.current, {
        ...mix('showing', 'resetY'),
        fill: '#515151'
      });
      gsap.to(active.current, {
        ...mix('hidden', 'bottomBig'),
        fill: '#515151'
      });
      gsap.to(input.current, { background: '#ffffff', color: '#515151' });
    }
  }

  return { iconRef, input, inactive, active };
}
