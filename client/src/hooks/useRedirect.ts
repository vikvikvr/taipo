import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// redirects to a different route when the condition is true

export function useRedirect(toPath: string, condition: boolean) {
  const history = useHistory();
  useEffect(redirect, [history, condition, toPath]);

  function redirect() {
    if (condition) {
      history.replace(toPath);
    }
  }
}
