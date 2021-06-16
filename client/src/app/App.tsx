import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as pages from 'pages';
import { Bokeh } from 'components/Bokeh';
import { PageContent } from './PageContent';
import './App.scss';

export const routes: RouteDescription[] = [
  { path: '/', Component: pages.HomePage },
  { path: '/login', Component: pages.LoginPage },
  { path: '/welcome', Component: pages.WelcomePage },
  { path: '/game/new', Component: pages.NewGamePage },
  { path: '/game/play', Component: pages.PlayGamePage },
  { path: '/game/over', Component: pages.GameOverPage },
  { path: '/game/invite', Component: pages.PlayFriendPage },
  { path: '/wait/random', Component: pages.WaitRandomPage },
  { path: '/wait/friend', Component: pages.WaitFriendPage }
];

export function App() {
  return (
    <div className="app">
      <Router>
        <Bokeh />
        <PageContent routes={routes} />
      </Router>
    </div>
  );
}

export const debug = false;

export type RouteDescription = { path: string; Component: () => JSX.Element };
