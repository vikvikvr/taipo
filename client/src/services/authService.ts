import { debug } from 'app/App';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

// types

export interface User {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
}

export type SignInStrategy = 'google' | 'facebook' | 'github';

// behaviour subject

export const user$ = new BehaviorSubject<User | null>(null);

// main functions

export async function signIn(strategy: SignInStrategy) {
  const provider = chooseProvider(strategy);

  const credential = await firebase.auth().signInWithPopup(provider);

  if (credential.user) {
    const user = makeUser(credential.user);
    user$.next(user);
    document.title = `taipo | ${user.firstName}`;
    debug && console.log(user.firstName, 'signed in with', strategy);
  }
}

export async function signOut() {
  await firebase.auth().signOut();

  user$.next(null);
  document.title =
    'taipo | A typing game that takes your mistakes to the next level';
}

// providers

const githubProvider = new firebase.auth.GithubAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

githubProvider.setCustomParameters({
  allow_signup: 'false',
  prompt: 'select_account'
});

// helper functions

function chooseProvider(strategy: SignInStrategy) {
  let provider = googleProvider;

  switch (strategy) {
    case 'facebook':
      debug && console.log('facebook sign in not implemented yet!');
      break;
    case 'github':
      provider = githubProvider;
      break;
  }

  return provider;
}

function makeUser(user: firebase.User): User {
  return {
    email: user.email || 'no-email',
    firstName: user.displayName || 'no-name',
    lastName: user.displayName || 'no-name',
    imageUrl: user.photoURL || 'no-photo'
  };
}
