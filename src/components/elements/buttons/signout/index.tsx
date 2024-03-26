import { signOut } from 'next-auth/react';

import { MyButton } from '~/components/elements/buttons/button';

export const SignOutButton = () => {
  return (
    <MyButton size="small" onClick={() => signOut()}>
      Sign out
    </MyButton>
  );
};
