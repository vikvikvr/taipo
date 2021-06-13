import { TypoIcon } from 'assets/icons';
import classNames from 'classnames';
import React from 'react';
import './TaipoLogo.scss';

interface Props {
  small?: boolean;
  className?: string;
  id?: string;
}

export function TaipoLogo({ small, className, id }: Props) {
  const containerClass = classNames('taipo-logo', className, { small });

  return (
    <div className={containerClass} id={id}>
      <h1>t</h1>
      <div className="middle">
        <h1 className="accent">ài</h1>
        <TypoIcon className="underline" />
      </div>
      <h1>po</h1>
    </div>
  );
}
