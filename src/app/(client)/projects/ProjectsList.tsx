import ProjectCard from '@/components/client/ProjectCard';

type Project = {
  title: string;
  slug: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
};

const ProjectsList = async ({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
      {projects?.map(item => (
        <ProjectCard item={item} key={item.slug} />
      ))}
    </div>
  );
};

export default ProjectsList;
