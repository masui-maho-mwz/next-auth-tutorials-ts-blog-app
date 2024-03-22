import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';

export const SignInButton = () => {
  return (
    <div>
      <MyButton size="small" asChild>
        <Link href="/signin">Sign in</Link>
      </MyButton>
    </div>
  );
};
