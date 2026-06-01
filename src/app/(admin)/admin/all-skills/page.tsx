import { getAllSkills } from '@/actions/skillsAction';
import AdminSkillsCard from '@/components/admin/AdminskillsCard';
import SectionBar from '@/components/layout/Section-Bar';

const page = async () => {
  const skills = await getAllSkills();
  return (
    <>
      <section className="px-5 pb-4 pt-20 md:pt-4">
        <SectionBar
          title="All skills"
          description="View, edit, or delete your skills.-"
        />

        <div className="mt-3  border-b border-b-border">
          {skills?.status ? (
            <AdminSkillsCard data={skills?.data ?? []} />
          ) : (
            <p> {skills?.message}</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
