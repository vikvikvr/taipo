import React from 'react';
import { useAnimation } from './BlockedOverlay.gsap';
import './BlockedOverlay.scss';

interface Props {
  isActive: boolean;
}

// darkens the screen when the player
// makes a mistake

export function BlockedOverlay({ isActive }: Props) {
  useAnimation(isActive);

  return <div className="blocked-overlay"></div>;
}
