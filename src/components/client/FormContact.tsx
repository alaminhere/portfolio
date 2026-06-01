'use client';

import { useActionState, useEffect } from 'react';

import { sendEmailAction } from '@/actions/sendEmailAction';
import handleAlert from '@/libs/handleAlert';

import Input from '../ui/input';
import Textarea from '../ui/textrea';
import Button from '../ui/button';

const FormContact = () => {
  const [state, formAction, isPending] = useActionState(sendEmailAction, null);

  useEffect(() => {
    if (!state) return;

    handleAlert(state.status, state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-5 stagger">
      <Input
        required
        label="Name"
        type="text"
        name="name"
        placeholder="Your Name"
      />

      <Input
        required
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
      />

      <Textarea
        required
        label="Message"
        name="message"
        rows={5}
        placeholder="Tell me about your project"
      />

      <Button
        disabled={isPending}
        loading={isPending}
        type="submit"
        className="mt-5"
      >
        Send Message ↗
      </Button>
    </form>
  );
};

export default FormContact;
