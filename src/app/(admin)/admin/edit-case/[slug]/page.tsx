import { getSingleProject } from '@/actions/projectActions';
import FormAddCase from '@/components/admin/Form-AddCase';
import SectionBar from '@/components/layout/Section-Bar';

const EditCaseStudy = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const project = await getSingleProject(slug);

  return (
    <>
      <section className="px-5 pb-4 pt-20 md:pt-4">
        <SectionBar
          title="Edit case study"
          description={
            project.data?.title
              ? project.data?.title
              : 'Add a new case study to your portfolio'
          }
        />
        <FormAddCase initialProject={project.data ?? null} />
      </section>
    </>
  );
};

export default EditCaseStudy;
