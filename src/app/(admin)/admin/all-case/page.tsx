
import { getAllProject } from '@/actions/projectActions';
import AdminProjectCard from '@/components/admin/AdminProjectCard';
import SectionBar from '@/components/layout/Section-Bar';

const page = async () => {
  const project = await getAllProject();
  return (
    <>
      <section className="px-5 pb-4 pt-20 md:pt-4">
        <SectionBar
          title="All case studies"
          description="View, edit, or delete your case studies."
        />

        <div className="mt-3  border-b border-b-border">
          {project?.status ? (
            <AdminProjectCard data={project?.data ?? []} />
          ) : (
            <p> {project?.message}</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
