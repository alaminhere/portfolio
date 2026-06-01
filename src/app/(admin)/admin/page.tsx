import { getAllProject, getRelativeTime } from '@/actions/projectActions';
import { getAllSkills } from '@/actions/skillsAction';

import AdminProjectCard from '@/components/admin/AdminProjectCard';
import AdminSkillsCard from '@/components/admin/AdminskillsCard';
import SectionBar from '@/components/layout/Section-Bar';
import Lable from '@/components/ui/lable';

const AdminPage = async () => {
  const project = await getAllProject();
  const skills = await getAllSkills();
  const latestProject = await getRelativeTime();

  const total_case = project.data?.length;

  const DashboardMenu = [
    { title: 'Total case', value: String(total_case) },
    { title: 'Published', value: String(total_case) },
    { title: 'Latest Project', value: String(latestProject) },
    { title: 'Total Views', value: 15 },
  ];

  return (
    <section className="px-5 pt-20 pb-4 md:pt-4">
      <SectionBar
        title="Overview"
        description="A quick snapshot of my case studies."
      />

      {/* Overview */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {DashboardMenu.map((item, index) => (
          <div key={index} className="rounded-xl bg-primary/5 px-5 py-4">
            <p>{item.title}</p>

            {index === 2 ? (
              <h3 className="text-primary">{item.value}</h3>
            ) : (
              <h2 className="text-primary">{item.value}</h2>
            )}
          </div>
        ))}
      </div>

      {/* All skills */}
      <div className="mt-8">
        <Lable>All Skills</Lable>

        <div className="mt-3 border-b border-b-border">
          {skills.status ? (
            <AdminSkillsCard data={skills.data ?? []} />
          ) : (
            <p>{skills.message}</p>
          )}
        </div>
      </div>

      {/* Recent case studies */}
      <div className="mt-12">
        <Lable>Recent case studies</Lable>

        <div className="mt-3 border-b border-b-border">
          {project.status ? (
            <AdminProjectCard data={project.data ?? []} />
          ) : (
            <p>{project.message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
