import { KeyboardIcon } from 'assets/icons';
import { SlidingButton } from 'components/SlidingButton';
import React from 'react';
import './HeroSection.scss';
import heroGraphic from 'assets/images/hero-graphic1.png';

interface Props {
  onButtonClick(): void;
}

export function HeroSection({ onButtonClick }: Props) {
  return (
    <section className="hero-section">
      <div className="left column">
        <h1 className="hero-title">Being fast won't be enough!</h1>
        <p className="hero-subtitle">
          A typing game that takes your
          <br />
          mistakes to the next level
        </p>
        <SlidingButton
          text="Play Now"
          Icon={KeyboardIcon}
          id="hero-cta-button"
          variant="parallax"
          onClick={onButtonClick}
        />
      </div>
      <div className="right column">
        <img className="hero-graphic" src={heroGraphic} alt="hero graphic" />
      </div>
    </section>
  );
}
