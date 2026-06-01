'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { login } from '@/actions/authActions';
import handleAlert from '@/libs/handleAlert';
import { LoginFormData } from '@/libs/types';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

const FormLogin = () => {
  const route = useRouter();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [state, formAction, isPending] = useActionState(login, null);

  const onSubmit = (data: LoginFormData) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.status) {
      route.push('verification');
    } else {
      handleAlert(state.status, state.message);
    }
  }, [route, state]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 stagger"
    >
      <Input
        type="email"
        label="E-mail"
        placeholder="example@gmail.com"
        {...register('email', {
          required: 'Email is required',
        })}
        error={errors.email}
      />

      <div className="relative w-full">
        <Input
          type={show ? 'text' : 'password'}
          label="Password"
          placeholder="••••••••"
          {...register('password', {
            required: 'Password is required',
          })}
          error={errors.password}
        />

        <button
          type="button"
          onClick={() => setShow(prev => !prev)}
          className={`absolute right-3 top-1/2 text-text-muted transition-colors ${
            errors.password ? '-translate-y-1/2' : 'translate-y-1/2'
          }`}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        loading={isPending}
        className="mt-8 w-full"
      >
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
