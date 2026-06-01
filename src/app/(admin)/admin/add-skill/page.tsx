import FormAddSkill from '@/components/admin/Form-AddSkill';
import SectionBar from '@/components/layout/Section-Bar';

const AddSkill = () => {
  return (
    <>
      <section className="px-5 pb-4 pt-20 md:pt-4">
        <SectionBar
          title="Add skill"
          description="Add a new skill to your portfolio."
        />
        <FormAddSkill initialSkill={null} />
      </section>
    </>
  );
};

export default AddSkill;
