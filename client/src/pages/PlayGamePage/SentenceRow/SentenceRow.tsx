import './SentenceRow.scss';
import { Letter } from './Letter/Letter';
import React from 'react';
import { useAnimation } from './SentenceRow.gsap';

interface Props {
  word: string;
  letterIndex: number;
  isBlocked: boolean;
  typos: number[];
}

// focal point of the game screen

export function SentenceRow({ word, letterIndex, isBlocked, typos }: Props) {
  useAnimation();

  const rightWord = word.substr(letterIndex, 8);

  return (
    <div className="sentence-row">
      {rightWord.split('').map((letter, index) => {
        const isTypo = typos.includes(letterIndex + index);
        return (
          <Letter
            key={'letter-' + index}
            letter={letter}
            highlight={index === 0 && !isTypo}
            isTypo={isTypo}
            isBlocked={isBlocked && index === 0}
          />
        );
      })}
    </div>
  );
}
