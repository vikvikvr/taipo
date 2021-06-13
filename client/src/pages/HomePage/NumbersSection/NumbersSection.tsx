import React from 'react';
import './NumbersSection.scss';

export function NumbersSection() {
  return (
    <section className="numbers-section">
      <h1 className="numbers-section-title">By numbers</h1>
      <div className="columns-container">
        <div className="column">
          <h1 className="number-number highlight">245</h1>
          <h2 className="number-name">Typos</h2>
          <p className="number-description">
            Made by players
            <br />
            in the last minute
          </p>
        </div>
        <div className="column">
          <h1 className="number-number">378</h1>
          <h2 className="number-name">Players</h2>
          <p className="number-description">
            Busy competing
            <br />
            against each others
          </p>
        </div>
        <div className="column">
          <h1 className="number-number">11K</h1>
          <h2 className="number-name">Sentences</h2>
          <p className="number-description">
            Completed
            <br />
            successfully
          </p>
        </div>
      </div>
    </section>
  );
}
