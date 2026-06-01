import Link from 'next/link';

import Button from '../ui/button';
import Badeg from '../ui/badeg';

const Line = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div className="flex">
    <span className="mr-5 w-4 shrink-0 select-none text-right text-placeholder/50">
      {n}
    </span>

    <span className="whitespace-pre">{children}</span>
  </div>
);
const stack = ['Next.js', 'Node.js', 'Express', 'TypeScript', 'MongoDb', 'SQL'];

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="app-container relative z-10 flex lg:min-h-215 flex-col items-center justify-center gap-10 pt-20 lg:flex-row lg:gap-16">
        {/* Left Content */}
        <div className="order-2 flex w-full flex-col items-start lg:order-1 lg:w-1/2 stagger">
          <h1 className="md:w-[65%] xl:w-[90%]">
            Building fast, secure{' '}
            <span className="bg-linear-to-r from-primary to-orange-300 bg-clip-text text-transparent">
              full-stack products.
            </span>
          </h1>
          <p className="mt-4 md:text-[18px]">
            Full-stack developer building modern web applications with Next.js,
            Node.js, Express, TypeScript, and database-driven backend systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/#caseStudy">
              <Button>View case studies</Button>
            </Link>

            <Link href="/#contact">
              <Button variant="secondary">Get in touch</Button>
            </Link>
          </div>
          <div className="mt-10 w-full max-w-xl border-t border-border pt-6">
            <div className="flex flex-wrap gap-2">
              {stack.map(t => (
                <Badeg variant="techStack" key={t}>
                  {t}
                </Badeg>
              ))}
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="order-1 flex w-full items-center justify-center lg:order-2 lg:w-1/2 ">
          <div className="relative w-full lg:max-w-150 px-2 py-8">
            <div className="relative overflow-hidden md:min-h-70 rounded-2xl border border-border bg-surface shadow-[10px_10px_0_var(--surface-hover)] stagger">
              <div className="flex items-center gap-3 border-b border-border bg-surface-hover/50 px-5 py-3.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                </div>

                <span className="font-mono text-xs text-placeholder">
                  api/projects.ts
                </span>
              </div>

              <pre className="overflow-x-auto scrollbar-thumb-border p-5 font-mono text-[12px] leading-[1.9] text-text sm:text-[13px]">
                <Line n={1}>
                  <span className="text-placeholder">
                    {'// fetch all projects'}
                  </span>
                </Line>

                <Line n={2}>
                  <span className="text-primary">app</span>.get(
                  <span className="text-success">
                    &quot;/projects&quot;
                  </span>, <span className="text-accent">async</span> (req, res)
                  =&gt; {'{'}
                </Line>

                <Line n={3}>
                  {'  '}
                  <span className="text-accent">const</span> data ={' '}
                  <span className="text-accent">await</span>{' '}
                  db.project.findMany();
                </Line>

                <Line n={4}>
                  {'  '}res.json({'{'} ok:{' '}
                  <span className="text-accent">true</span>, data {'}'});
                </Line>

                <Line n={5}>{'}'});</Line>

                <Line n={6}>{''}</Line>

                <Line n={7}>
                  <span className="text-primary">app</span>.listen(
                  <span className="text-warning">5000</span>);
                </Line>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
