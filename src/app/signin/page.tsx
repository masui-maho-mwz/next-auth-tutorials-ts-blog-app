'use client';

import { signIn, useSession } from 'next-auth/react';

export default function SignInPage() {
  const { data: session } = useSession();
  if (session) {
    return <p>Redirecting...</p>;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('github', { callbackUrl: '/admin' })}>Sign in with GitHub</button>
    </div>
  );
}
