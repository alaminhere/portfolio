import { Suspense } from 'react';

import { getAllProject } from '@/actions/projectActions';
import Pagination from '@/components/client/Pagination';

import ProjectsList from './ProjectsList';

const ProjectsSkeleton = () => (
  <div className="flex min-h-150 items-center justify-center py-20">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
  </div>
);

const ProjectPage = async () => {
  const projects = await getAllProject();

  return (
    <>
      <section className="relative overflow-hidden ">
        <div className="app-container relative z-50 flex flex-col justify-center pt-25 pb-5">
          <div className="flex items-center justify-start gap-2">
            <div className="relative h-2 w-2 rounded-full bg-primary">
              <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-3 border-primary/20" />
            </div>

            <p className="uppercase text-primary">All Projects</p>
          </div>

          <h1 className="mt-5 mb-3 bg-linear-to-r from-text to-primary bg-clip-text text-transparent">
            My Development Work
          </h1>

          <p className="w-full md:w-[70%] md:text-[18px]">
            Explore the projects I&apos;ve built, showcasing modern
            technologies, clean architecture, and practical solutions to
            real-world problems.
          </p>
        </div>
      </section>

      <section>
        <div className="app-container py-10 pb-5">
          <Suspense fallback={<ProjectsSkeleton />}>
            {projects.status ? (
              <ProjectsList projects={projects.data!} />
            ) : (
              projects.message
            )}
          </Suspense>
        </div>
      </section>

      <Pagination page={1} />
    </>
  );
};

export default ProjectPage;
