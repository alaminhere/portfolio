import About from '@/components/client/About';
import Contact from '@/components/client/Contact';
import Hero from '@/components/client/Hero';
import Project from '@/components/client/Project';
import Skills from '@/components/client/Skills';
import WhatIDo from '@/components/client/WhatIDo';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <WhatIDo />
      <Skills />
      <Project />
      <Contact />
    </>
  );
};

export default Home;
