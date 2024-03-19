'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { signIn, useSession } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const callbackUrl = searchParams.get('callbackUrl') || '/admin';
      router.push(callbackUrl);
    }
  }, [session, searchParams, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/admin',
    });

    if (result?.error) {
      alert(`認証エラーです: ${result.error}`);
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('github', { callbackUrl: '/admin' })}>Sign in with GitHub</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign in with Email and Password</button>
      </form>
    </div>
  );
}
