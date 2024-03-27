'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { signIn, useSession } from 'next-auth/react';

import { MyButton } from '~/components/elements/buttons/button';

import styles from './styles.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <MyButton color="primary" size="small">
          Sign in with Email and Password
        </MyButton>
      </form>
      <p className={styles.registerPrompt}>
        アカウントをお持ちでない方は、
        <Link href="/signup">こちら</Link>
        からユーザー登録をお願いいたします。
      </p>
    </div>
  );
}
