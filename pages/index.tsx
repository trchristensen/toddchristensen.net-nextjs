import Head from "next/head";
import Image from "next/image";
import Container from "components/Container/Container.component";
import AwesomeSwiper from "components/AwesomeSwiper/AwesomeSwiper";
import ProjectCard from "components/ProjectCard/ProjectCard";
import { ArrowLink } from "components/ArrowLink/ArrowLink.component";

import PROJECTS from "data/projects.json";

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16 w-full">
        <IntroSection />
        {/* <FeaturedProjects /> */}
        <Todo />
      </div>
    </Container>
  );
}

const IntroSection = () => (
  <section
    id="IntroSection"
    className="flex flex-col-reverse sm:flex-row items-start"
  >
    <div className="flex flex-col pr-8">
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
        Todd Christensen
      </h1>
      <div className="flex flex-row items-center mb-4">
        <h2 className="text-gray-700 dark:text-gray-200">Web Developer</h2>
        <span className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <span className="inline-block mx-2">/</span>
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Open to job offers
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-16">
        Realizing my ideas through code. California native, currently residing
        in the Philippines 🇵🇭
      </p>
    </div>
    <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
      <Image
        alt="Todd Christensen"
        height={176}
        width={176}
        src="/avatar.jpg"
        className="rounded-full filter transition-all hover:grayscale"
      />
    </div>
  </section>
);

const FeaturedProjects = () => {
  return (
    <section id="FeaturedProjects" className="w-full relative">
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white flex flex-row items-end justify-between w-full">
        Featured Projects{" "}
      </h3>

      <AwesomeSwiper>
        {PROJECTS.data.map((project, idx: number) => (
          <ProjectCard {...project} key={idx} />
        ))}
      </AwesomeSwiper>
      <div className="flex gap-20 w-full flex-col"></div>
      <div className="flex">
        <ArrowLink href="/projects" blank={false} text="View all projects" />
      </div>
    </section>
  );
};

const Todo = () => (
  <section id="Hobbies">
    <h3 className="mt-16 font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white flex flex-row items-end justify-between w-full">
      To do:{" "}
    </h3>
    <ol className="list-inside ml-8 text-gray-600 dark:text-gray-400">
      <li>books page needs work on crud. add whole link function for adding books. add a recommend feature for people to add books who aren't me... add a read or will read feature</li>
      <li>Header component</li>
      <li>blog (powered by hive blockchain)</li>
      <li>Resume</li>
      <li>Custom chat window with AI</li>
      <li>Hobbies page (music production, gaming production, <span className="line-through">books i've read</span>, travel</li>
    </ol>
  </section>
);
