import './App.scss';
// libraries
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
// components
import * as pages from 'pages';
import { Bokeh } from 'components/Bokeh';
import { VolumeController } from 'components/VolumeController';
// hooks
import { useSocketReceiver } from './hooks/useSocketReceiver';

const routes: [string, MaybeComponent][] = [
  ['/', pages.HomePage],
  ['/login', pages.LoginPage],
  ['/welcome', pages.WelcomePage],
  ['/game/new', pages.NewGamePage],
  ['/game/play', pages.PlayGamePage],
  ['/game/over', pages.GameOverPage],
  ['/game/invite', pages.PlayFriendPage],
  ['/wait/random', pages.WaitRandomPage],
  ['/wait/friend', pages.WaitFriendPage]
];

function App() {
  return (
    <BrowserRouter>
      <Bokeh />
      <VolumeController />
      <PageContent />
    </BrowserRouter>
  );
}

type MaybeComponent = () => JSX.Element | null;

// deprecation in console for react-transition-group
// https://github.com/reactjs/react-transition-group/issues/668#issuecomment-695162879

function PageContent() {
  useSocketReceiver();

  const timeout = 500;
  const classNames = 'fade';
  const commonProps = { timeout, classNames, unmountOnExit: true };

  return (
    <div className="app">
      {routes.map(([path, Component]) => (
        <Route path={path} key={path} exact>
          {({ match }) => (
            <CSSTransition in={match !== null} {...commonProps}>
              <Component />
            </CSSTransition>
          )}
        </Route>
      ))}
      <Redirect to="/" />
    </div>
  );
}

export default App;
