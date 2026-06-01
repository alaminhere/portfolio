'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { changePassword } from '@/actions/profileActions';
import { ChangePasswordFormData } from '@/libs/types';
import handleAlert from '@/libs/handleAlert';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

const FormChangePassword = () => {
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [state, formAction, isPending] = useActionState(changePassword, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>();

  const onSubmit = (data: ChangePasswordFormData) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (!state) return;

    handleAlert(state.status, state.message);
  }, [state]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <Input
          type={show.currentPassword ? 'text' : 'password'}
          label="Current password"
          placeholder="••••••••"
          {...register('currentPassword', {
            required: 'Current password is required',
          })}
          error={errors.currentPassword}
        />

        <button
          type="button"
          onClick={() =>
            setShow(prev => ({
              ...prev,
              currentPassword: !prev.currentPassword,
            }))
          }
          className={`absolute right-3 top-1/2 text-text-muted transition-colors ${
            errors.currentPassword ? '-translate-y-1/2' : 'translate-y-1/2'
          }`}
          aria-label={
            show.currentPassword
              ? 'Hide current password'
              : 'Show current password'
          }
        >
          {show.currentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="relative w-full">
        <Input
          type={show.newPassword ? 'text' : 'password'}
          label="New password"
          placeholder="••••••••"
          {...register('newPassword', {
            required: 'New password is required',
          })}
          error={errors.newPassword}
        />

        <button
          type="button"
          onClick={() =>
            setShow(prev => ({
              ...prev,
              newPassword: !prev.newPassword,
            }))
          }
          className={`absolute right-3 top-1/2 text-text-muted transition-colors ${
            errors.newPassword ? '-translate-y-1/2' : 'translate-y-1/2'
          }`}
          aria-label={
            show.newPassword ? 'Hide new password' : 'Show new password'
          }
        >
          {show.newPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="relative w-full">
        <Input
          type={show.confirmPassword ? 'text' : 'password'}
          label="Confirm new password"
          placeholder="••••••••"
          {...register('confirmPassword', {
            required: 'Confirm password is required',
          })}
          error={errors.confirmPassword}
        />

        <button
          type="button"
          onClick={() =>
            setShow(prev => ({
              ...prev,
              confirmPassword: !prev.confirmPassword,
            }))
          }
          className={`absolute right-3 top-1/2 text-text-muted transition-colors ${
            errors.confirmPassword ? '-translate-y-1/2' : 'translate-y-1/2'
          }`}
          aria-label={
            show.confirmPassword
              ? 'Hide confirm password'
              : 'Show confirm password'
          }
        >
          {show.confirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        loading={isPending}
        className="mt-8"
      >
        Save changes
      </Button>
    </form>
  );
};

export default FormChangePassword;
