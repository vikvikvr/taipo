import { useState } from 'react';

export interface GitHubUser {
  email: string;
  familyName: string;
  givenName: string;
  gitHubId: string;
  imageUrl: string;
  name: string;
}

// this is fake for now
// might replace with firebase's one in the future

export function useGitHubAuth() {
  const [user, setUser] = useState<GitHubUser | null>(null);

  function signIn() {
    setUser({
      email: 'carl@email.com',
      familyName: 'Dawson',
      givenName: 'Carl',
      gitHubId: '1234',
      imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
      name: 'Bob Dawson'
    });
  }

  function signOut() {
    setUser(null);
  }

  return { user, signIn, signOut };
}
