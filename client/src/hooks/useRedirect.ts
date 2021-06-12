import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// custom hook to redirect to a different route
// based on a dynamic condition

export function useRedirect(toPath: string, condition: boolean) {
  const history = useHistory();
  useEffect(redirect, [history, condition, toPath]);

  function redirect() {
    if (condition) {
      history.replace(toPath);
    }
  }
}
