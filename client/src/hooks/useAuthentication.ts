import { useCallback, useEffect } from 'react';
import { User, user$ } from 'services/authService';
import { FacebookUser, useFacebookAuth } from './useFacebookAuth';
import { GitHubUser, useGitHubAuth } from './useGitHubAuth';
import { GoogleUser, useGoogleAuth } from './useGoogleAuth';

export type SignInStrategy = 'google' | 'facebook' | 'github';
type AuthUser = GoogleUser | FacebookUser | GitHubUser;

// I admit it's very messy
// used to 'merge' 3 different auth strategies

export function useAuthentication(onSignIn?: () => void) {
  const google = useGoogleAuth({ keepSignedIn: false });
  const facebook = useFacebookAuth();
  const github = useGitHubAuth();
  const onUserChange = useCallback(
    (user: AuthUser | null) => {
      if (user) {
        user$.next(makeUser(user));
        document.title = `taipo | ${user.givenName}`;
        onSignIn?.();
      }
    },
    [onSignIn]
  );

  useEffect(() => onUserChange(google.user), [google.user, onUserChange]);
  useEffect(() => onUserChange(facebook.user), [facebook.user, onUserChange]);
  useEffect(() => onUserChange(github.user), [github.user, onUserChange]);

  function signIn(strategy: SignInStrategy) {
    switch (strategy) {
      case 'google':
        google.signIn();
        break;
      case 'facebook':
        facebook.signIn();
        break;
      case 'github':
        github.signIn();
        break;
    }
  }

  function signOut() {
    // all the others are 'fake' as of now
    google.signOut();
    document.title =
      'taipo | A typing game that takes your mistakes to the next level';
    user$.next(null);
  }

  function makeUser(user: AuthUser): User | null {
    if (!user) {
      return null;
    }

    return {
      firstName: user.givenName,
      lastName: user.familyName,
      imageUrl: user.imageUrl,
      email: user.email
    };
  }

  return { signIn, signOut };
}
