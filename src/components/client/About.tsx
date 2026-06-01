import Image from 'next/image';

import Badeg from '../ui/badeg';
import Lable from '../ui/lable';

const About = () => {
  return (
    <section className="" id="about">
      <div className="app-container flex flex-col justify-between items-center lg:flex-row gap-10">
        {/* left */}
        <div className="w-full lg:max-w-110 rounded-[14px] stagger">
          <Image
            src="/alamin_about_v3.webp"
            width={450}
            height={450}
            alt="about-image"
            className="border border-border/0 rounded-xl w-full"
          />
        </div>

        <div className="w-full flex-1 stagger">
          <Lable>-- About Me</Lable>

          <h2>A Developer Who Loves to Share</h2>

          <p className="mt-2 mb-3">
            I&apos;m Md. Alamin — a Full-Stack Developer who enjoys turning
            ideas into real, useful web applications. I work across both
            frontend and backend, building clean interfaces, reliable APIs, and
            database-driven systems.
          </p>

          <p className="mb-3">
            I&apos;ve worked on different real-world projects, taking them from
            planning and development to a complete working product. Along the
            way, I&apos;ve gained solid experience with React, Next.js,
            TypeScript, Node.js, Express, Prisma, MongoDB, and MySQL.
          </p>

          <p>
            I enjoy solving problems, exploring new technologies, and building
            things that actually work. Every project gives me a chance to learn
            something new, improve my skills, and become a better developer.
          </p>

          <div className="mt-5 space-x-2 space-y-2">
            <Badeg variant="techStack">4+ Projects Shipped</Badeg>
            <Badeg variant="techStack">100% Real Payments</Badeg>
            <Badeg variant="techStack">6+ Core Skills</Badeg>
            <Badeg variant="techStack">Learning: Node/Express</Badeg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
