import { FacebookIcon, GitHubIcon, TwitterIcon } from 'assets/icons';
import { TaipoLogo } from 'components/TaipoLogo';
import React from 'react';
import './Footer.scss';

export function Footer() {
  return (
    <footer className="page-footer">
      <div className="left">
        <TaipoLogo small />
        <p className="copyright">© 2021 Ricchiuto Viktor</p>
      </div>
      <div className="links">
        <div className="column">
          <h2 className="header">Explore</h2>
          <ul>
            <li className="link">Home</li>
            <li className="link">About</li>
            <li className="link">Rules</li>
          </ul>
        </div>
        <div className="column">
          <h2 className="header">Follow</h2>
          <ul>
            <li className="link">Facebook</li>
            <li className="link">Twitter</li>
            <li className="link">GitHub</li>
          </ul>
        </div>
        <div className="column">
          <h2 className="header">Legal</h2>
          <ul>
            <li className="link">Terms</li>
            <li className="link">Privacy</li>
          </ul>
        </div>
      </div>
      <div className="social">
        <FacebookIcon className="icon" />
        <TwitterIcon className="icon" />
        <GitHubIcon className="icon" />
      </div>
    </footer>
  );
}
