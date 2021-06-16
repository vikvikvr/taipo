import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';

// shared animation pieces

const slideUp = mix('bottom', 'hidden');
const slideUp2 = mix('bottomBig', 'hidden');
const slideDown = mix('top', 'hidden');
const slideDown2 = mix('topBig', 'hidden');
const slideLeft2 = mix('rightBig', 'hidden');
const defaults = { ...mix('hidden'), stagger: 0.15 };

export function useHomePageAnimation() {
  useEffect(animateNavBar, []);
  useEffect(animateHeroSection, []);
  useEffect(animateFeaturesSection, []);
  useEffect(animateTrySection, []);
  useEffect(animateNumbersSection, []);
  useEffect(animateFooter, []);

  function animateNavBar() {
    gsap
      .timeline({ delay: 0.5 })
      .from('#nav-taipo-logo', slideDown2, 0)
      .from('.nav-link-main', slideDown, 0.15)
      .from('.nav-link-social', slideDown, 0.3);
  }

  function animateHeroSection() {
    gsap
      .timeline({ delay: 1.5, defaults })
      .from('.hero-title', slideUp2, 0)
      .from('.hero-subtitle', slideUp, 0.3)
      .from('.hero-graphic', slideLeft2, 0.9)
      .from('#hero-cta-button', slideDown, 1.5);
  }

  function animateFeaturesSection() {
    const stagger = 0.6;

    makeTriggerTimeline('.features-section')
      .from('.features-section-title', slideUp)
      .from('.feature-icon', { ...slideDown2, stagger }, 0.6)
      .from('.feature-name', { ...slideUp, stagger }, 0.75)
      .from('.feature-description', { ...slideUp, stagger }, 0.9);
  }

  function animateTrySection() {
    makeTriggerTimeline('.try-section')
      .from('.try-title', slideUp2)
      .from('.try-subtitle', slideUp, 0.3)
      .from('.try-graphic', slideLeft2, 0.9)
      .from('#try-cta-button', slideDown, 1.5);
  }

  function animateNumbersSection() {
    const stagger = 0.6;

    makeTriggerTimeline('.numbers-section')
      .from('.numbers-section-title', slideUp)
      .from('.number-number', { ...slideDown, stagger }, 0.6)
      .from('.number-name', { ...slideUp, stagger }, 0.75)
      .from('.number-description', { ...slideUp, stagger }, 0.9);
  }

  function animateFooter() {
    makeTriggerTimeline('.scroll-up-button', 'top 70%').from(
      '.scroll-up-button',
      slideUp
    );
    makeTriggerTimeline('.page-footer', 'top 70%')
      .from('#taipo-logo-footer', slideUp2, 0.6)
      .from('.footer-column', { ...slideUp2, stagger: 0.15 }, 0.9)
      .from('.footer-icon-social', { ...slideUp, stagger: 0.07 }, 1.8)
      .from('.footer-copyright', slideUp, 1.8);
  }
}

function makeTriggerTimeline(trigger: string, start = 'top 60%') {
  const commonTrigger = {
    scroller: '.home-page',
    toggleActions: 'play none none none'
  };

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end: start,
      ...commonTrigger
    },
    delay: 0.3
  });
}
