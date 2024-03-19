'use client';

import Link from 'next/link';

import { signOut, useSession } from 'next-auth/react';

export const AuthenticationToggle = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return (
      <div>
        Not signed in. <Link href="/signin">Sign in</Link>
      </div>
    );
  }

  if (session.user.image === null) return null;

  return (
    <div>
      {session.user.name} <br />
      <img src={session.user.image || ''} alt="Usericonなし" style={{ width: '24px', height: '24px' }} />
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};
