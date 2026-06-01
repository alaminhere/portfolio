'use server';

import { prisma } from '@/libs/prisma';
import { ProjectFormData } from '@/libs/types';
import { deleteCloudinaryImage } from '@/libs/deleteCloudinaryImage';
import { revalidatePath } from 'next/cache';

/*---------------------------------------------------*
 * Get All Projects                                  *
 * Retrieves all available projects from the database.*
 *---------------------------------------------------*/

export const getAllProject = async (query?: {
  currentPage?: number;
  limit?: number;
}) => {
  //
  const limit = query?.limit ? Number(query.limit) : undefined;
  const page = Number(query?.currentPage || 1);
  const skip = limit ? (page - 1) * limit : undefined;

  try {
    const p = await prisma.project.count();
    const totalPage = limit ? Math.ceil(p / limit) : 1;

    const project = await prisma.project.findMany({
      select: {
        title: true,
        slug: true,
        description: true,
        image: true,
      },
      skip: skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    if (!project) {
      return {
        status: false,
        message: 'No project found!',
        data: project,
      };
    }

    return {
      status: true,
      message: 'Successfully fetched',
      data: project,
      totalPage,
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
export const getSingleProject = async (slug: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        slug: slug,
      },
    });
    if (!project) {
      return {
        status: false,
        message: 'No project found!',
        data: project,
      };
    }

    return {
      status: true,
      message: 'Successfully fetched',
      data: project,
    };
  } catch {
    return {
      status: false,
      message: 'Failed to fetch',
    };
  }
};

/*---------------------------------------------------*
 * Get Relative Time                                 *
 * Returns the relative time for the given date.     *
 *---------------------------------------------------*/

export const getRelativeTime = async () => {
  try {
    const project = await prisma.project.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        createdAt: true,
        slug: true,
      },
    });

    if (!project) {
      return 'No project found';
    }

    const now = Date.now();
    const past = project.createdAt.getTime();

    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return `${diff} seconds ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  } catch {
    return {
      status: false,
      message: 'Something went wrong!',
    };
  }
};

/*---------------------------------------------------*
 * Create Project                                    *
 * Creates a new project.                            *
 *---------------------------------------------------*/

export const createProject = async (
  prevData: unknown,
  formData: ProjectFormData,
) => {
  try {
    await prisma.project.create({
      data: formData,
    });

    revalidatePath('/');
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin');
    revalidatePath('/admin/all-case');
    revalidatePath('/projects/');
    return {
      status: true,
      message: 'Successfully created',
    };
  } catch {
    return {
      status: false,
      message: 'Failed to create',
    };
  }
};

/*---------------------------------------------------*
 * Update Project                                    *
 * Updates an existing project.                      *
 *---------------------------------------------------*/

export const updateProject = async (
  prevData: unknown,
  formData: ProjectFormData,
) => {
  try {
    const slug = formData.slug;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, ...data } = formData;

    await prisma.project.update({
      where: {
        slug: slug,
      },
      data,
    });

    revalidatePath('/');
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin/edit-case/');
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
 * Delete Project                                    *
 * Deletes an existing project.                      *
 *---------------------------------------------------*/

export const deleteProject = async (slug: string, public_id: string) => {
  try {
    await prisma.project.delete({
      where: {
        slug: slug,
      },
    });

    await deleteCloudinaryImage(public_id);

    revalidatePath('/');
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin/');
    revalidatePath('/admin/all-case');
    revalidatePath('/projects/');
    revalidatePath(`/projects/${slug}`);

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
