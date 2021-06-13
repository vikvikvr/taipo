import React from 'react';
import { LetterDone } from './LetterDone/LetterDone';
import './LettersScatter.scss';

interface Props {
  letters: string;
}

export function LettersScatter({ letters }: Props) {
  return (
    <div className="letters-scatter">
      {letters.split('').map((letter, index) => {
        return <LetterDone key={'scattered-letter-' + index} letter={letter} />;
      })}
    </div>
  );
}
