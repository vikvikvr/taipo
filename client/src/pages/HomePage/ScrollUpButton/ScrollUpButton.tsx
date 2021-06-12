import { GoBackIcon } from 'assets/icons';
import React from 'react';
import './ScrollUpButton.scss';

// floating button placed in the middle
// just above the footer

export function ScrollUpButton() {
  function handleClick() {
    alert('not implemented');
  }

  return (
    <div className="scroll-up-button" onClick={handleClick}>
      <GoBackIcon />
    </div>
  );
}
