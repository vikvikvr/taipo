import { KeyboardIcon, SkaterIcon } from 'assets/icons';
import { SlidingButton } from 'components/SlidingButton';
import React from 'react';
import './HeroSection.scss';

interface Props {
  onButtonClick(): void;
}

export function HeroSection({ onButtonClick }: Props) {
  return (
    <section className="hero-section">
      <div className="left column">
        <h1 className="title">Being fast won't be enough!</h1>
        <p className="subtitle">
          A typing game that takes your
          <br />
          mistakes to the next level
        </p>
        <SlidingButton
          Icon={KeyboardIcon}
          text="Play Now"
          variant="parallax"
          onClick={onButtonClick}
        />
      </div>
      <div className="right column">
        <div className="graphic">
          <SkaterIcon />
        </div>
      </div>
    </section>
  );
}
