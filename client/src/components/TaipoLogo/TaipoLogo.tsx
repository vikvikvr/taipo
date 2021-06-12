import { TypoIcon } from 'assets/icons';
import React from 'react';
import './TaipoLogo.scss';

interface Props {
  small?: boolean;
}

export function TaipoLogo({ small }: Props) {
  return (
    <div className={'taipo-logo ' + (small ? 'small' : '')}>
      <h1>t</h1>
      <div className="middle">
        <h1 className="accent">ài</h1>
        <TypoIcon className="underline" />
      </div>
      <h1>po</h1>
    </div>
  );
}
