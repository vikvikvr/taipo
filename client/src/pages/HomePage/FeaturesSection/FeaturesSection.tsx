import { DangerIcon, FriendsIcon, TypingIcon } from 'assets/icons';
import React from 'react';
import './FeaturesSection.scss';

export function FeaturesSection() {
  return (
    <section className="features-section">
      <h2 className="title">How it works</h2>
      <div className="features-container">
        <div className="feature">
          <TypingIcon className="icon" />
          <h2 className="name">Type it</h2>
          <p className="description">
            Complete the sentence you are given as fast as you can
          </p>
        </div>
        <div className="feature">
          <DangerIcon className="icon" />
          <h2 className="name">Watch out</h2>
          <p className="description">
            Some letters are not the ones you would expect, so be careful
          </p>
        </div>
        <div className="feature">
          <FriendsIcon className="icon" />
          <h2 className="name">Compete</h2>
          <p className="description">
            Challenge random opponents or invite a friend to play together
          </p>
        </div>
      </div>
    </section>
  );
}
