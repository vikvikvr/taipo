import React from 'react';
import './NumbersSection.scss';

export function NumbersSection() {
  return (
    <section className="numbers-section">
      <h1 className="title">By numbers</h1>
      <div className="columns-container">
        <div className="column">
          <h1 className="number">245</h1>
          <h2 className="name">Typos</h2>
          <p className="description">Made by players in the last minute</p>
        </div>
        <div className="column">
          <h1 className="number">378</h1>
          <h2 className="name">Players</h2>
          <p className="description">Busy competing against each others</p>
        </div>
        <div className="column">
          <h1 className="number">11K</h1>
          <h2 className="name">Sentences</h2>
          <p className="description">Completed successfully</p>
        </div>
      </div>
    </section>
  );
}
