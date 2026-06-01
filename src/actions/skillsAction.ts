'use server';

import { prisma } from '@/libs/prisma';
import { SkillFormData } from '@/libs/types';
import { revalidatePath } from 'next/cache';

/*---------------------------------------------------*
 * Get All Skills                                *
 * Retrieves all available skills from the database.*
 *---------------------------------------------------*/

export const getAllSkills = async () => {
  try {
    const skills = await prisma.adminSkill.findMany();

    if (!skills) {
      return {
        status: false,
        message: 'No skills found!',
        data: skills,
      };
    }

    return {
      status: true,
      message: 'Successfully fetched',
      data: skills,
    };
  } catch {
    return {
      status: false,
      message: 'Failed to fetch',
    };
  }
};

/*---------------------------------------------------*
 * Get Single Project                                *
 * Retrieves a single project by slug.               *
 *---------------------------------------------------*/
export const getSingleSkill = async (slug: string) => {
  try {
    const skill = await prisma.adminSkill.findUnique({
      where: {
        slug: slug,
      },
    });
    if (!skill) {
      return {
        status: false,
        message: 'No skill found!',
        data: skill,
      };
    }

    return {
      status: true,
      message: 'Successfully fetched',
      data: skill,
    };
  } catch {
    return {
      status: false,
      message: 'Failed to fetch',
    };
  }
};

/*---------------------------------------------------*
 * Create Skill                                    *
 * Creates a new skill.                            *
 *---------------------------------------------------*/

export const createSkill = async (
  prevData: unknown,
  formData: SkillFormData,
) => {
  try {
    await prisma.adminSkill.create({
      data: formData,
    });

    revalidatePath('/');
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin');
    revalidatePath('/admin/all-skills');
    revalidatePath('/skills/');
    return {
      status: true,
      message: 'Successfully created',
    };
  } catch (error) {
    return {
      status: false,
      message: error || 'Failed to create',
    };
  }
};

/*---------------------------------------------------*
 * Update Skill                                    *
 * Updates an existing skill.                      *
 *---------------------------------------------------*/

export const updateSkill = async (
  prevData: unknown,
  formData: SkillFormData,
) => {
  try {
    const slug = formData.slug;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, ...data } = formData;

    await prisma.adminSkill.update({
      where: {
        slug: slug,
      },
      data,
    });

    revalidatePath('/');
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin/edit-skills/');
    revalidatePath('/projects/');
    revalidatePath(`/projects/${slug}`);

    return {
      status: true,
      message: 'Successfully Updated',
    };
  } catch {
    return {
      status: false,
      message: 'Failed to Update',
    };
  }
};

/*---------------------------------------------------*
 * Delete Skill                                    *
 * Deletes an existing skill.                      *
 *---------------------------------------------------*/

export const deleteSkill = async (slug: string) => {
  try {
    await prisma.adminSkill.delete({
      where: {
        slug: slug,
      },
    });

    revalidatePath('/');
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin/');
    revalidatePath('/admin/all-skills');
    revalidatePath('/projects/');
    revalidatePath(`/admin/all-skills/${slug}`);

    return {
      status: true,
      message: 'Successfully Deleted',
    };
  } catch {
    return {
      status: false,
      message: 'Failed to Delete',
    };
  }
};
