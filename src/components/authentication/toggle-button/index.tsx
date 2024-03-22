'use client';

import { useSession } from 'next-auth/react';

import { SignInButton } from '~/components/authentication/toggle-button/signin';
import { SignOutButton } from '~/components/authentication/toggle-button/signout';

export const AuthenticationToggle = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return <SignInButton />;
  }
  return <SignOutButton />;
};
