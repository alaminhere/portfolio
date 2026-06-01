import FormAddCase from '@/components/admin/Form-AddCase';
import SectionBar from '@/components/layout/Section-Bar';

const AddCaseStudy = () => {
  return (
    <>
      <section className="px-5 pb-4 pt-20 md:pt-4">
        <SectionBar
          title="Add case study"
          description="Add a new case study to your portfolio."
        />
        <FormAddCase initialProject={null} />
      </section>
    </>
  );
};

export default AddCaseStudy;
