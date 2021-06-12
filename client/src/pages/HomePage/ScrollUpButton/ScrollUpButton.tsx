import { GoBackIcon } from 'assets/icons';
import { usePullDownOnHover } from 'hooks/usePullDownOnHover';
import React from 'react';
import './ScrollUpButton.scss';

// floating button placed in the middle
// just above the footer

export function ScrollUpButton() {
  const { container } = usePullDownOnHover(true);

  function handleClick() {
    alert('not implemented');
  }

  return (
    <div className="scroll-up-button" onClick={handleClick} ref={container}>
      <GoBackIcon />
    </div>
  );
}
