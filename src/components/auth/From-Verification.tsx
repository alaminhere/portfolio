'use client';

import { useActionState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { loginVerify } from '@/actions/authActions';
import handleAlert from '@/libs/handleAlert';

import Button from '../ui/button';
import Input from '../ui/input';

const FromVerification = ({ verifyEmail }: { verifyEmail: string | null }) => {
  const [state, formAction, isPending] = useActionState(loginVerify, null);
  const route = useRouter();

  useEffect(() => {
    if (!state) return;

    const doSignIn = async () => {
      if (state.status) {
        const result = await signIn('credentials', {
          email: state.email,
          code: state.code,
          redirect: false,
        });

        if (result?.ok) {
          route.push('/admin');
          handleAlert(result.ok, 'Successfully logged in');
        } else {
          handleAlert(false, result?.error ?? 'Failed to log in');
        }
      } else {
        handleAlert(state.status, state.message);
      }
    };

    doSignIn();
  }, [route, state]);

  return (
    <form action={formAction} className="w-full space-y-5 stagger">
      <Input name="code" type="number" />

      <input name="email" type="hidden" readOnly value={verifyEmail ?? ''} />

      <Button
        type="submit"
        disabled={isPending}
        loading={isPending}
        className="w-full"
      >
        Verify Code
      </Button>
    </form>
  );
};

export default FromVerification;
