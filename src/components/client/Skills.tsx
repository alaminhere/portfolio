import { getAllSkills } from '@/actions/skillsAction';
import { Cable, CircleHelp, Database, Monitor, Server } from 'lucide-react';

import Card from '../ui/card';
import Lable from '../ui/lable';

const Skills = async () => {
  const Adminskills = await getAllSkills();

  const iconStyles = [
    'bg-success-bg text-success',
    'bg-info-bg text-info',
    'bg-warning-bg text-warning',
    'bg-accent-bg text-accent',
  ];

  return (
    <section>
      <div className="app-container">
        <div className="stagger">
          <Lable>-- Skills</Lable>

          <h2>Tools & Technologies</h2>

          <p className="mt-2 lg:w-[60%]">
            The technologies and tools I use to build full-stack applications.
          </p>
        </div>

        <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {Adminskills?.data?.map((item, index) => {
            const Icon =
              item.title === 'Full-Stack & Backend'
                ? Server
                : item.title === 'Frontend Development'
                  ? Monitor
                  : item.title === 'Database & Validation'
                    ? Database
                    : item.title === 'Tools & Integrations'
                      ? Cable
                      : CircleHelp;

            const iconStyle = iconStyles[index % iconStyles.length];

            return (
              <Card key={index} className="bg-surface/25! hover:bg-surface-hover! backdrop-blur-md!">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconStyle}`}
                >
                  <Icon size={24} />
                </div>

                <h4 className="mt-4 mb-2">{item.title}</h4>

                <ul>
                  {item.techStack.map((tech, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between border-b border-dashed border-border px-3 py-1 text-text-muted text-base font-light"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
