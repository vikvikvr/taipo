import { KeyboardIcon, TryItOutIcon } from 'assets/icons';
import { SlidingButton } from 'components/SlidingButton';
import React from 'react';
import './TrySection.scss';

interface Props {
  onButtonClick(): void;
}

export function TrySection({ onButtonClick }: Props) {
  return (
    <section className="try-section">
      <div className="left column">
        <h1 className="title">Try it out, it's free!</h1>
        <p className="subtitle">Practice to become the ultimate master typer</p>
        <SlidingButton
          Icon={KeyboardIcon}
          text="Play Now"
          variant="parallax"
          onClick={onButtonClick}
        />
      </div>
      <div className="right column">
        <div className="graphic">
          <TryItOutIcon />
        </div>
      </div>
    </section>
  );
}
