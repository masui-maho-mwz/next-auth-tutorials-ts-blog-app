'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { SignOutButton } from '~/components/elements/buttons/signout';
import { MyContainer } from '~/features/app/components/container';

import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export const MyPageLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !session.user) {
      router.push('/signin');
    }
  }, [session, status, router]);

  return (
    <div id="page">
      <header id="masthead" className={styles.header}>
        <div className={styles.logo}>My Blog 管理画面</div>
        <Link href="/">ホーム画面</Link>
        {session?.user?.name}
        <SignOutButton />
      </header>
      <MyContainer id="main" asChild>
        <main>{children}</main>
      </MyContainer>
    </div>
  );
};
