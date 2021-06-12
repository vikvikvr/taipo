import React from 'react';
import './LetterDone.scss';
import { useAnimation } from './LetterDone.gsap';

interface Props {
  letter: string;
}

// a blurry letter that zooms out and fades
// appears after each correct letter typed by the player

export function LetterDone({ letter }: Props) {
  const { containerRef } = useAnimation(letter);

  return (
    <div ref={containerRef} className="letter-done">
      <div className="text">{letter}</div>
    </div>
  );
}
