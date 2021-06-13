import React from 'react';
import './NavBar.scss';
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  TwitterIcon
} from 'assets/icons';
import { TaipoLogo } from 'components/TaipoLogo';

export function NavBar() {
  return (
    <nav className="nav-bar">
      <TaipoLogo id="nav-taipo-logo" />
      <ul className="links">
        <li className="nav-link-main active">Home</li>
        <li className="nav-link-main">About</li>
        <li className="nav-link-main">Contact us</li>
      </ul>
      <ul className="social">
        <li className="nav-link-social">
          <FacebookIcon className="icon" />
        </li>
        <li className="nav-link-social">
          <InstagramIcon className="icon" />
        </li>
        <li className="nav-link-social">
          <TwitterIcon className="icon" />
        </li>
        <li className="nav-link-social">
          <GitHubIcon className="icon" />
        </li>
      </ul>
    </nav>
  );
}
