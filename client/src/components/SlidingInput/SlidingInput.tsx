import './SlidingInput.scss';
import React from 'react';
import { playSound } from 'services/audioService';
import { useAnimation } from './SlidingInput.gsap';
import { ReactSVG } from 'components/SlidingButton';

interface Props {
  value: string;
  onClick(): void;
  InactiveIcon: ReactSVG;
  ActiveIcon: ReactSVG;
  isActive: boolean;
  id?: string;
  placeholder?: string;
  onChange?(e: any): void;
}

// input that changes color and icon after click
// not clicked - icon1 + white
// clicked - icon2 + green

export function SlidingInput({
  value,
  onChange,
  onClick,
  placeholder,
  InactiveIcon,
  ActiveIcon,
  isActive,
  id
}: Props) {
  const refs = useAnimation(isActive);

  function handleClick() {
    playSound(isActive ? 'mouseClick' : 'valid');
    onClick();
  }

  return (
    <div className="sliding-input" ref={refs.input}>
      <input
        value={value}
        onChange={onChange}
        // defaultValue={onChange ? undefined : value}
        placeholder={placeholder}
        type="text"
      />
      <div className="icon-container" onClick={handleClick} ref={refs.iconRef}>
        <InactiveIcon className="inactive-icon icon" ref={refs.inactive} />
        <ActiveIcon className="active-icon icon" ref={refs.active} />
      </div>
    </div>
  );
}
