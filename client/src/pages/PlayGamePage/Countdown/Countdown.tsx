import React, { useEffect, useState } from 'react';
import { useAnimation } from './Countdown.gsap';
import './Countdown.scss';

interface Props {
  startTime: number;
}

export function Countdown({ startTime }: Props) {
  const [timeLeft, setTimeLeft] = useState((Date.now() - startTime) / 1000);
  const secondsLeft = Math.floor(-timeLeft + 1);
  useAnimation(secondsLeft);
  useEffect(updateTimeLeft, [startTime]);

  function updateTimeLeft() {
    const handle = setInterval(() => {
      setTimeLeft((Date.now() - startTime) / 1000);
    }, 100);
    return () => {
      clearInterval(handle);
    };
  }

  // needed because game has a default startTime of 0
  if (secondsLeft < 0) {
    return <div></div>;
  }

  return (
    <div className="countdown">
      <div className="number one">1</div>
      <div className="number two">2</div>
      <div className="number three">3</div>
    </div>
  );
}
