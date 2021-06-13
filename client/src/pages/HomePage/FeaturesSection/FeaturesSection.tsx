import { DangerIcon, FriendsIcon, TypingIcon } from 'assets/icons';
import React from 'react';
import './FeaturesSection.scss';

export function FeaturesSection() {
  return (
    <section className="features-section">
      <h2 className="features-section-title">How it works</h2>
      <div className="features-row">
        <div className="feature-column">
          <TypingIcon className="feature-icon" />
          <h2 className="feature-name">Type it</h2>
          <p className="feature-description">
            Complete the <br /> sentence as fast
            <br /> as you can
          </p>
        </div>
        <div className="feature-column">
          <DangerIcon className="feature-icon" />
          <h2 className="feature-name">Watch out</h2>
          <p className="feature-description">
            Some letters are
            <br />
            not the ones you
            <br />
            would expect
          </p>
        </div>
        <div className="feature-column">
          <FriendsIcon className="feature-icon" />
          <h2 className="feature-name">Compete</h2>
          <p className="feature-description">
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
