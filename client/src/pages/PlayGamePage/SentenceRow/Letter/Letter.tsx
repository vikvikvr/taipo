import './Letter.scss';
import React from 'react';
import classnames from 'classnames';
import { useAnimation } from './Letter.gsap';
import { TypoIcon } from 'assets/icons';

interface Props {
  letter: string;
  isBlocked: boolean;
  isTypo: boolean;
  highlight?: boolean;
}

export function Letter({ letter, highlight, isBlocked, isTypo }: Props) {
  const { letterRef } = useAnimation(isBlocked);

  const container = classnames({
    letter: true,
    highlight: highlight,
    blocked: isBlocked,
    typo: isTypo
  });

  return (
    <div className={container} ref={letterRef}>
      <div className="text">{letter}</div>
      {isTypo && <TypoIcon className="typo-underline" />}
    </div>
  );
}
