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
            Complete the <br /> sentence as fast
            <br /> as you can
          </p>
        </div>
        <div className="feature">
          <DangerIcon className="icon" />
          <h2 className="name">Watch out</h2>
          <p className="description">
            Some letters are
            <br />
            not the ones you
            <br />
            would expect
          </p>
        </div>
        <div className="feature">
          <FriendsIcon className="icon" />
          <h2 className="name">Compete</h2>
          <p className="description">
            Play with friends
            <br />
            or with strangers,
            <br />
            your choice
          </p>
        </div>
      </div>
    </section>
  );
}
