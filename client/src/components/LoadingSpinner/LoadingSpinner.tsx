import React from 'react';
import { useAnimation } from './LoadingSpinner.gsap';
import './LoadingSpinner.scss';

// 3 circles pulsating

export function LoadingSpinner() {
  useAnimation();

  return (
    <div className="loading">
      <div id="first-circle" className="circle"></div>
      <div id="second-circle" className="circle"></div>
      <div id="third-circle" className="circle"></div>
    </div>
  );
}
