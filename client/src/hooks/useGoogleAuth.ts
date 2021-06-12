import { useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { user$ } from 'services/authService';
import { useSubject } from './useSubject';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

export interface GoogleUser {
  email: string;
  familyName: string;
  givenName: string;
  googleId: string;
  imageUrl: string;
  name: string;
}

interface HookOptions {
  keepSignedIn?: boolean;
  onError?(error?: any): void;
}

export function useGoogleAuth(options?: HookOptions) {
  const [user, setUser] = useState<GoogleUser | null>(null);
  // eslint-disable-next-line
  const [_, updateUser] = useSubject(user$);
  const { signOut } = useGoogleLogout({
    clientId: clientId,
    onLogoutSuccess: () => {
      setUser(null);
      updateUser(null);
    },
    onFailure: options?.onError
  });
  const { signIn } = useGoogleLogin({
    clientId: clientId,
    prompt: 'select_account',
    onSuccess: (res: any) => setUser(res.profileObj),
    onFailure: options?.onError,
    isSignedIn: options?.keepSignedIn || false
  });

  return { user, signIn, signOut };
}
