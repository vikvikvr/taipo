import React, { useState } from 'react';
import './VolumeController.scss';
import { Howler } from 'howler';

// floating button on the bottom-right side
// responsible to toggle Howler's volume

export function VolumeController() {
  const [isMuted, setIsMuted] = useState(false);

  function toggleVolume() {
    Howler.volume(isMuted ? 1 : 0);
    setIsMuted(!isMuted);
  }

  return (
    <div className="volume-controller">
      <button onClick={toggleVolume}>{isMuted ? '🔈' : '🔊'}</button>
    </div>
  );
}
