import { useEffect } from 'react';
import { gsap } from 'gsap';

// animation durations are customized
// to make loop as seamless as possible
// since circles don't start from the edges
// of the screen

export function useAnimation() {
  useEffect(animateSmallCircle, []);
  useEffect(animateMediumCircle, []);
  useEffect(animateLargeCircle, []);

  function animateSmallCircle() {
    const infinite = { repeat: -1, yoyo: true };
    const start = { left: '15vw', top: '15vh' };
    const left = { left: 0, top: '40vh' };
    const right = { left: '60vw', top: 0 };

    gsap
      .timeline({ defaults: { ease: 'linear' } })
      .fromTo('#circle1', start, { ...left, duration: 11 })
      .to('#circle1', { ...right, duration: 22, ...infinite });
  }

  function animateMediumCircle() {
    const infinite = { repeat: -1, yoyo: true };
    const start = { left: '10vw', top: '60vh' };
    const right = { left: '90vw', top: '20vh' };
    const left = { left: 0, top: '80vh' };

    gsap
      .timeline({ defaults: { ease: 'linear' } })
      .fromTo('#circle2', start, { ...right, duration: 16 })
      .to('#circle2', { ...left, duration: 16, ...infinite });
  }

  function animateLargeCircle() {
    const infinite = { repeat: -1, yoyo: true };
    const start = { left: '70vw', top: '60vh' };
    const left = { left: '15vw', top: '-10vh' };
    const right = { left: '70vw', top: '60vh' };

    gsap
      .timeline({ defaults: { ease: 'linear' } })
      .fromTo('#circle3', start, { ...left, duration: 8 })
      .to('#circle3', { ...right, duration: 11, ...infinite });
  }
}
