import React from 'react';
import './App.scss';
import { Redirect, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useSocketReceiver } from 'hooks/useSocketReceiver';
import { RouteDescription } from './App';

interface Props {
  routes: RouteDescription[];
}

function PageContent({ routes }: Props) {
  useSocketReceiver();

  const transitionProps = {
    timeout: 500,
    classNames: 'fade',
    unmountOnExit: true
  };

  return (
    <>
      {routes.map(({ path, Component }) => (
        <Route path={path} key={path} exact>
          {({ match }) => (
            <CSSTransition in={match !== null} {...transitionProps}>
              <Component />
            </CSSTransition>
          )}
        </Route>
      ))}
      <Redirect to="/" />
    </>
  );
}

// deprecation in console for react-transition-group
// see https://github.com/reactjs/react-transition-group/issues/668#issuecomment-695162879

export { PageContent };
