import { FacebookIcon, GitHubIcon, TwitterIcon } from 'assets/icons';
import { TaipoLogo } from 'components/TaipoLogo';
import React from 'react';
import './Footer.scss';

export function Footer() {
  return (
    <footer className="page-footer">
      <div className="left">
        <TaipoLogo small id="taipo-logo-footer" />
        <p className="footer-copyright">© 2021 Ricchiuto Viktor</p>
      </div>
      <div className="footer-links-main">
        <div className="footer-column">
          <h2 className="footer-links-header">Explore</h2>
          <ul>
            <li className="footer-link">Home</li>
            <li className="footer-link">About</li>
            <li className="footer-link">Rules</li>
          </ul>
        </div>
        <div className="footer-column">
          <h2 className="footer-links-header">Follow</h2>
          <ul>
            <li className="footer-link">Facebook</li>
            <li className="footer-link">Twitter</li>
            <li className="footer-link">GitHub</li>
          </ul>
        </div>
        <div className="footer-column">
          <h2 className="footer-links-header">Legal</h2>
          <ul>
            <li className="footer-link">Terms</li>
            <li className="footer-link">Privacy</li>
          </ul>
        </div>
      </div>
      <div className="footer-links-social">
        <FacebookIcon className="footer-icon-social" />
        <TwitterIcon className="footer-icon-social" />
        <GitHubIcon className="footer-icon-social" />
      </div>
    </footer>
  );
}
