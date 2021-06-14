import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeIn = { opacity: 0, ease: 'power3.out' };
const slideUp = { y: '1em', ...fadeIn };
const slideDown = { y: '-1em', ...fadeIn };
const slideLeft2 = { x: '2em', ...fadeIn };
const defaults = { ...fadeIn, stagger: 0.15 };

export function useHomePageAnimation() {
  useEffect(animateNavBar, []);
  useEffect(animateHeroSection, []);
  useEffect(animateFeaturesSection, []);
  useEffect(animateTrySection, []);
  useEffect(animateNumbersSection, []);
  useEffect(animateFooter, []);

  function animateNavBar() {
    gsap
      .timeline({ delay: 0.5, defaults })
      .from('#nav-taipo-logo', slideUp)
      .from('.nav-link-main', fadeIn)
      .from('.nav-link-social', slideUp);
  }

  function animateHeroSection() {
    gsap
      .timeline({ delay: 0.5, defaults })
      .from('.hero-title', slideUp)
      .from('.hero-subtitle', slideUp)
      .from('#hero-cta-button', slideUp)
      .from('.hero-graphic', slideDown);
  }

  function animateFeaturesSection() {
    const stagger = 0.3;
    makeTriggerTimeline('.features-section')
      .from('.features-section-title', slideDown)
      .from('.feature-icon', { ...slideDown, stagger }, 0)
      .from('.feature-name', { ...slideUp, stagger }, 0.15)
      .from('.feature-description', { ...slideUp, stagger }, 0.3);
  }

  function animateTrySection() {
    makeTriggerTimeline('.try-section')
      .from('.try-title', slideDown)
      .from('.try-subtitle', slideDown, 0.15)
      .from('#try-cta-button', slideUp)
      .from('.try-graphic', slideLeft2, 0.5);
  }

  function animateNumbersSection() {
    const stagger = 0.3;
    makeTriggerTimeline('.numbers-section')
      .from('.numbers-section-title', slideDown)
      .from('.number-number', { ...slideDown, stagger }, 0)
      .from('.number-name', { ...slideUp, stagger }, 0.15)
      .from('.number-description', { ...slideUp, stagger }, 0.3);
  }

  function animateFooter() {
    makeTriggerTimeline('.scroll-up-button', 'top 70%').from(
      '.scroll-up-button',
      slideUp
    );
    makeTriggerTimeline('.page-footer', 'top 70%')
      .from('#taipo-logo-footer', slideDown, 0.3)
      .from('.footer-copyright', slideUp, 0.3)
      .from('.footer-column', { ...slideUp, stagger: 0.15 }, 0.5)
      .from('.footer-icon-social', { ...slideUp, stagger: 0.07 }, 0.9);
  }
}

function makeTriggerTimeline(
  trigger: string,
  start = 'top 60%'
  // end = 'bottom center'
) {
  // start: 'top center',
  const commonTrigger = {
    scroller: '.home-page',
    // markers: true,
    toggleActions: 'play none none reverse'
  };

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end: start,
      ...commonTrigger
    }
  });
}
