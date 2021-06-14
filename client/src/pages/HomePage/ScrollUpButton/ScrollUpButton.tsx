import { GoBackIcon } from 'assets/icons';
import { usePullDownOnHover } from 'hooks/usePullDownOnHover';
import React from 'react';
import './ScrollUpButton.scss';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { playSound } from 'services/audioService';

gsap.registerPlugin(ScrollToPlugin);

// floating button placed in the middle
// just above the footer

export function ScrollUpButton() {
  const { container } = usePullDownOnHover(true);

  function handleClick() {
    playSound('mouseClick');
    gsap.to('.home-page', { scrollTo: 0 });
  }

  return (
    <div className="scroll-up-button" onClick={handleClick} ref={container}>
      <GoBackIcon />
    </div>
  );
}
