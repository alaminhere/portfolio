'use server';

import { prisma } from '@/libs/prisma';
import { ChangePasswordFormData, UpdateProfileFormData } from '@/libs/types';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';
import authOptions from '@/libs/authOptions';

/*---------------------------------------------------
 * Update Profile
 * Updates the authenticated admin profile.
 *---------------------------------------------------*/

export const updateProfile = async (prevData: unknown, formData: FormData) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      status: false,
      message: 'Unauthorized',
    };
  }

  const data: UpdateProfileFormData = {
    fullName: formData.get('fullName') as string,
    bio: formData.get('bio') as string,
    github: formData.get('github') as string,
    linkedin: formData.get('linkedin') as string,
    facebook: formData.get('facebook') as string,
    whatsapp: formData.get('whatsapp') as string,
    location: formData.get('location') as string,
    resume: formData.get('resume') as string,
  };

  try {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: data.fullName,
        bio: data.bio,
        github: data.github,
        linkedin: data.linkedin,
        facebook: data.facebook,
        whatsapp: data.whatsapp,
        location: data.location,
      },
    });

    revalidatePath('/admin/profile');
    revalidatePath('/');

    return {
      status: true,
      message: 'Successfully updated',
    };
  } catch {
    return {
      status: false,
      message: 'Failed to update',
    };
  }
};

/*---------------------------------------------------
 * Change Password
 * Changes the authenticated admin password.
 *---------------------------------------------------*/

export const changePassword = async (
  prevData: unknown,
  formData: ChangePasswordFormData,
) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      status: false,
      message: 'Unauthorized',
    };
  }

  const { currentPassword, newPassword, confirmPassword } = formData;

  try {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return {
        status: false,
        message: 'All fields are required',
      };
    }

    if (newPassword !== confirmPassword) {
      return {
        status: false,
        message: 'New password and confirm password do not match.',
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return {
        status: false,
        message: 'User not found',
      };
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return {
        status: false,
        message: 'Incorrect current password',
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      status: true,
      message: 'Password updated successfully',
    };
  } catch {
    return {
      status: false,
      message: 'Failed to update password',
    };
  }
};
