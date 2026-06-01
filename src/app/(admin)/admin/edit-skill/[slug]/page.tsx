import { getSingleSkill } from '@/actions/skillsAction';
import FormAddSkill from '@/components/admin/Form-AddSkill';
import SectionBar from '@/components/layout/Section-Bar';

const EditSkill = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const skill = await getSingleSkill(slug);

  return (
    <>
      <section className="px-5 pb-4 pt-20 md:pt-4">
        <SectionBar
          title="Edit case study"
          description={
            skill.data?.title
              ? skill.data?.title
              : 'Add a new case study to your portfolio'
          }
        />
        <FormAddSkill initialSkill={skill.data ?? null} />
      </section>
    </>
  );
};

export default EditSkill;
