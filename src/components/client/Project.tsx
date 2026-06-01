import Link from 'next/link';

import { getAllProject } from '@/actions/projectActions';

import Button from '../ui/button';
import Lable from '../ui/lable';

import ProjectCard from './ProjectCard';

const Project = async () => {
  const limit = 3;
  const project = await getAllProject({ limit });

  return (
    <section>
      <div className="app-container py-10">
        <div className="stagger">
          <Lable>-- projects</Lable>

          <h2 id="caseStudy">Projects That Showcase My Skills</h2>

          <p className="mt-2 lg:w-[60%]">
            A selection of full-stack projects built with modern technologies,
            focusing on clean UI, reliable backend logic, and real-world
            functionality.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {project?.data?.map(item => (
            <ProjectCard item={item} key={item.slug} />
          ))}
        </div>

        <div className="flex items-center justify-start">
          <Link href="/projects">
            <Button className="mt-10">view all Projects ↗</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Project;