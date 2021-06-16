import { gsap } from 'services/animationService';
import { useMouseHover } from 'hooks/useMouseHover';
import { useEffect, useRef } from 'react';
import { SlideVariant } from './SlidingButton';

export function useAnimation(variant: SlideVariant, backgroundColor?: string) {
  const button = useRef(null);
  const span = useRef(null);
  const svg = useRef(null);
  const { isHovered } = useMouseHover(button);
  useEffect(toggleSlidingAnimation, [isHovered, variant, backgroundColor]);

  function toggleSlidingAnimation() {
    const canAnimate = span.current && button.current && svg.current;

    if (!canAnimate) {
      return;
    }

    const isParallax = variant === 'parallax';

    if (isHovered) {
      // parallax: keep showing text
      // non-parallax: hide text
      gsap.to(span.current, {
        opacity: isParallax ? 1 : 0,
        translateX: isParallax ? '-2em' : '-4em'
      });
      gsap.to(svg.current, {
        opacity: 1,
        translateX: isParallax ? '3em' : 0
      });
      gsap.to(button.current, {
        backgroundColor: backgroundColor || undefined
      });
    } else {
      // default state: only show text
      gsap.to(span.current, { opacity: 1, translateX: 0 });
      gsap.to(svg.current, { opacity: 0, translateX: '4em' });
      gsap.to(button.current, {
        backgroundColor: backgroundColor || '#ef6c00'
      });
    }
  }

  return { span, button, svg };
}
