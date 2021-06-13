import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useHomePageAnimation() {
  useEffect(animateElements, []);

  function animateElements() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const defaults = { ...fadeIn, stagger: 0.15 };
    const slideUp = { y: '1em', ...fadeIn };
    const slideDown = { y: '-1em', ...fadeIn };
    gsap
      .timeline({ delay: 0.5, defaults })
      // nav bar
      .from('#nav-taipo-logo', slideUp, 0)
      .from('.nav-link-main', {}, 0)
      .from('.nav-link-social', slideUp, 0)
      // hero left
      .from('.hero-title', slideUp, 1)
      .from('.hero-subtitle', slideUp, 1)
      .from('#hero-cta-button', slideUp, 1)
      // hero right
      .from('.hero-graphic', slideDown, 1.5)
      // features section
      .from('.features-section-title', slideUp, 2)
      .from('.feature-icon', slideUp, 2)
      .from('.feature-name', slideUp, 2)
      .from('.feature-description', slideUp, 2)
      // try left
      .from('.try-title', slideUp, 2.5)
      .from('.try-subtitle', slideUp, 2.5)
      .from('#try-cta-button', slideUp, 2.5)
      // try right
      .from('.try-graphic', slideDown, 2.5)
      // numbers section
      .from('.numbers-section-title', slideUp, 3)
      .from('.number-number', slideUp, 3)
      .from('.number-name', slideUp, 3)
      .from('.number-description', slideUp, 3)
      // scroll up button
      .from('.scroll-up-button', slideUp, 3.5)
      // footer
      .from('#taipo-logo-footer', slideUp, 4)
      .from('.footer-copyright', slideUp, 4)
      .from('.footer-links-header', slideUp, 4)
      .from('.footer-link', slideUp, 4)
      .from('.footer-icon-social', slideUp, 4);
  }
}
