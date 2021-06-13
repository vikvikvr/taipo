import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as pages from 'pages';
import { Bokeh } from 'components/Bokeh';
import { VolumeController } from 'components/VolumeController';
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
        <VolumeController />
        <PageContent routes={routes} />
      </Router>
    </div>
  );
}

export type RouteDescription = { path: string; Component: MaybeComponent };
type MaybeComponent = () => JSX.Element | null;
