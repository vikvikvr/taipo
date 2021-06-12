import React from 'react';
import { useAnimation } from './Bokeh.gsap';
import './Bokeh.scss';

// 3 big blurred circles
// wandering around on the background

export function Bokeh() {
  useAnimation();

  return (
    <div className="bokeh">
      <div className="circle small" id="circle1"></div>
      <div className="circle medium" id="circle2"></div>
      <div className="circle large" id="circle3"></div>
    </div>
  );
}
