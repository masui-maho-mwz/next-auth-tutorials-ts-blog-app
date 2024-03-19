import Link from 'next/link';

import { MyContainer } from '~/features/app/components/container';

import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export const MyPageLayout = ({ children }: Props) => {
  return (
    <div id="page">
      <header id="masthead" className={styles.header}>
        <div className={styles.logo}>My Blog 管理画面</div>
        <Link href="/">ホーム画面</Link>
      </header>
      <MyContainer id="main" asChild>
        <main>{children}</main>
      </MyContainer>
    </div>
  );
};
