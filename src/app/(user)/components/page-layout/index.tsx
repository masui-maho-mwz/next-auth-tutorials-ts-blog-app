import Link from 'next/link';

import { AuthenticationToggle } from '~/components/authentication/toggle-button';

import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export const MyPageLayout = ({ children }: Props) => {
  return (
    <div id="page">
      <header id="masthead" className={styles.header}>
        <div className={styles.logo}>My Blog</div>
        <Link href="/">ホーム</Link>
        <Link href="/admin">管理者画面</Link>
        <AuthenticationToggle />
      </header>
      <main id="main" className={styles.main}>
        {children}
      </main>
      <footer id="footer" className={styles.footer}>
        <small>Dummy blog site presented by TECH QUEST</small>
      </footer>
    </div>
  );
};
