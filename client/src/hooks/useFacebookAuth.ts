import { useState } from 'react';

export interface FacebookUser {
  email: string;
  familyName: string;
  givenName: string;
  facebookId: string;
  imageUrl: string;
  name: string;
}

// this is fake for now
// might replace with firebase's one in the future

export function useFacebookAuth() {
  const [user, setUser] = useState<FacebookUser | null>(null);

  function signIn() {
    setUser({
      email: 'bob@email.com',
      familyName: 'Wrench',
      givenName: 'Bob',
      facebookId: '1234',
      imageUrl: 'https://randomuser.me/api/portraits/men/78.jpg',
      name: 'Bob Wrench'
    });
  }

  function signOut() {
    setUser(null);
  }

  return { user, signIn, signOut };
}
