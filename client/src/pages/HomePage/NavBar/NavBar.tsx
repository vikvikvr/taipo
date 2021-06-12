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
      <TaipoLogo />
      <ul className="links">
        <li className="active">Home</li>
        <li>About</li>
        <li>Contact us</li>
      </ul>
      <ul className="social">
        <li>
          <FacebookIcon className="icon" />
        </li>
        <li>
          <InstagramIcon className="icon" />
        </li>
        <li>
          <TwitterIcon className="icon" />
        </li>
        <li>
          <GitHubIcon className="icon" />
        </li>
      </ul>
    </nav>
  );
}
