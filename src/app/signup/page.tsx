'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { MyButton } from '~/components/elements/buttons/button';

import styles from './styles.module.css';

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const initialFormData: SignUpData = { name: '', email: '', password: '' };
  const [formData, setFormData] = useState<SignUpData>(initialFormData);
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session) {
      const callbackUrl = searchParams.get('callbackUrl') || '/admin';
      router.push(callbackUrl);
    }
  }, [session, searchParams, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '登録に失敗しました。');
      }
      setFormData(initialFormData);
      router.push('/signin');
    } catch (error: any) {
      alert(`登録エラー: ${error.message || '未知のエラーが発生しました。'}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={formData.name} onChange={handleChange} className={styles.input} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={formData.email} onChange={handleChange} className={styles.input} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <MyButton color="primary" size="small">
          Register
        </MyButton>
      </form>
    </div>
  );
}
