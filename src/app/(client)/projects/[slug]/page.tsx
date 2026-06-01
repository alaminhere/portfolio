export const dynamic = 'force-static';

import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getAllProject, getSingleProject } from '@/actions/projectActions';

import ListLable from '@/components/client/list-lable';
import Badeg from '@/components/ui/badeg';
import Button from '@/components/ui/button';
import Lable from '@/components/ui/lable';
import MiniCard from '@/components/ui/mini-card';

interface Props {
  params: Promise<{ slug: string }>;
}

const style = {
  paragraph: 'mt-3 w-full',
  spanParent: 'mt-8',
  cardParagraph: 'border-b border-dashed border-border pb-1 pt-1 text-text',
};

export const generateStaticParams = async () => {
  const project = await getAllProject();

  if (!project.status || !project.data) {
    return [];
  }

  return project.data.map(item => ({
    slug: item.slug,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const project = await getSingleProject(slug);

  return {
    title: project?.data?.title,
    description: project?.data?.description,
  };
};

const SingleCaseStudy = async ({ params }: Props) => {
  const { slug } = await params;
  const project = await getSingleProject(slug);

  if (!project.status || !project.data) {
    return notFound();
  }

  return (
    <section>
      <div className="app-container pt-25 ">
        <Lable>-- case-study</Lable>

        <div className="mt-3 space-y-8 stagger">
          <div>
            <ListLable title="Overview" index="01" />

            <h2 className="mt-3">{project.data.title}</h2>

            <p className={style.paragraph}>{project.data.description}</p>
          </div>

          <div>
            <ListLable title="Tech Stack" index="02" />

            <div className="mt-6 flex flex-wrap gap-3">
              {project.data.techStack.map((item, index) => (
                <Badeg key={index} variant="techStack">
                  {item}
                </Badeg>
              ))}
            </div>
          </div>

          <div>
            <ListLable title="Why these technologies" index="03" />

            <div className="mt-6 space-y-3">
              {project.data.whyTheseTechnologies.map((item, index) => (
                <div key={index} className="border-l-2 border-l-success px-4">
                  <p className="text-sm text-success">{`// ${item.title}`}</p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <ListLable title="Problems I faced" index="04" />

            <div className="mt-6 space-y-3">
              {project.data.problems.map((item, index) => (
                <MiniCard
                  key={index}
                  className="bg-background/5 backdrop-blur-md"
                >
                  <Badeg variant="warning">problem</Badeg>

                  <h4 className="mt-2">{item.title}</h4>

                  <p className="text-[15px]">{item.description}</p>
                </MiniCard>
              ))}
            </div>
          </div>

          <div>
            <ListLable title="How I solved them" index="05" />

            <div className="mt-6 space-y-3">
              {project.data.solutions.map((item, index) => (
                <MiniCard
                  key={index}
                  className="bg-background/5 backdrop-blur-md"
                >
                  <Badeg variant="success">solutions</Badeg>

                  <h4 className="mt-2">{item.title}</h4>

                  <p className="text-[15px]">{item.description}</p>
                </MiniCard>
              ))}
            </div>
          </div>

          <div>
            <ListLable title="Frontend vs Backend" index="06" />

            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <MiniCard className="w-full bg-background/5 backdrop-blur-md">
                <p className="text-sm">{`// frontend`}</p>

                {project.data.responsibilities.frontend.map((item, index) => (
                  <p key={index} className={style.cardParagraph}>
                    {item}
                  </p>
                ))}
              </MiniCard>

              <MiniCard className="w-full bg-background/5 backdrop-blur-md">
                <p className="text-sm">{`// backend`}</p>

                {project.data.responsibilities.backend.map((item, index) => (
                  <p key={index} className={style.cardParagraph}>
                    {item}
                  </p>
                ))}
              </MiniCard>
            </div>
          </div>

          <div>
            <ListLable title="Links" index="07" />

            <div className="mt-6 flex gap-3">
              <Link href={project.data.links?.liveDemo ?? '/'}>
                <Button>Live Demo ↗</Button>
              </Link>

              <Link href={project.data.links?.github ?? '/'}>
                <Button variant="secondary">GitHub repo ↗</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleCaseStudy;
