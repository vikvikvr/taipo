import React from 'react';
import './NavigationIcon.scss';
import { ExitIcon, GoBackIcon, HomeIcon } from 'assets/icons';
import { useHistory } from 'react-router-dom';
import { usePullDownOnHover } from 'hooks/usePullDownOnHover';
import { countdown, loading, mouseClick } from 'services/audioService';
import { useAnimation } from './NavigationIcon.gsap';

interface Props {
  toPath: string;
  icon: 'back' | 'home' | 'exit';
  onClick?(): void;
}

// floating icon button on the left side

export function NavigationIcon({ toPath, icon, onClick }: Props) {
  const history = useHistory();
  useAnimation();
  const { container } = usePullDownOnHover();

  function handleClick() {
    onClick?.();
    mouseClick.play();
    loading.stop();
    countdown.stop();
    history.push(toPath, {});
  }

  return (
    <div className="navigation-icon" onClick={handleClick} ref={container}>
      {icon === 'back' && <GoBackIcon className="back-icon" />}
      {icon === 'exit' && <ExitIcon />}
      {icon === 'home' && <HomeIcon className="home-icon" />}
    </div>
  );
}
