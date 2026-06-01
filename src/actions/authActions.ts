'use server';

import { prisma } from '@/libs/prisma';
import sendVerificationEmail from '@/libs/sendVerificationEmail';
import { LoginFormData } from '@/libs/types';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

/*---------------------------------------------------*
 * Login                                             *
 * Authenticates the user and creates a session.     *
 *---------------------------------------------------*/

export const login = async (prevData: unknown, formData: LoginFormData) => {
  const cookiesStore = await cookies();

  try {
    const data: LoginFormData = {
      email: formData.email,
      password: formData.password,
    };
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        status: false,
        message: 'User not found!',
      };
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return {
        status: false,
        message: 'Incorrect password!',
      };
    }

    // Generate a verification code and set an expiry date for it
    const verifyCode = Math.round(Math.random() * 900000 + 100000).toString();
    const expiryDate = new Date(Date.now() + 1000 * 60 * 10);

    await prisma.user.update({
      where: { email: data.email },
      data: { verifyCode: verifyCode, expiryDate: expiryDate },
    });

    await sendVerificationEmail(verifyCode, data.email);

    cookiesStore.set({
      name: 'VERIFY_EMAIL',
      value: data.email,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return {
      status: true,
      message: 'Verification code sent successfully!',
    };
  } catch {
    return {
      status: false,
      message: 'Failed to login!',
    };
  }
};

/*---------------------------------------------------*
 * Verify Login OTP                                  *
 * Verifies the admin login OTP.                    *
 *---------------------------------------------------*/

export const loginVerify = async (prevData: unknown, formData: FormData) => {
  const data = {
    email: formData.get('email') as string,
    code: formData.get('code') as string,
  };

  try {
    if (!data.email) {
      return {
        status: false,
        message: 'Verification code has expired',
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return {
        status: false,
        message: 'User not found!',
      };
    }

    if (!user.expiryDate || user.expiryDate.getTime() <= Date.now()) {
      return {
        status: false,
        message: 'Verification code has expired',
      };
    }
    if (user.verifyCode !== data.code) {
      return {
        status: false,
        message: 'Verification code is incorrect!',
      };
    }

    return {
      status: true,
      message: ' ',
      email: data.email,
      code: data.code,
    };
  } catch {
    return {
      status: false,
      message: 'Failed to login!',
    };
  }
};
