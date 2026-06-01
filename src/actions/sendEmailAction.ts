'use server';

import sendContactEmail from '@/libs/sendContactEmail';

/*---------------------------------------------------*
 * Send Email                                        *
 * Sends contact email                               *
 *---------------------------------------------------*/
export const sendEmailAction = async (
  prevData: unknown,
  formData: FormData,
) => {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    await sendContactEmail(name, email, message);

    return {
      status: true,
      message: 'Message sent successfully.',
    };
  } catch {
    return {
      status: false,
      message: 'Failed to send message.',
    };
  }
};
