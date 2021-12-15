import Head from "next/head";
import Image from "next/image";
import Container from "components/Container/Container.component";
import AwesomeSwiper from "components/AwesomeSwiper/AwesomeSwiper";
import ProjectCard from "components/ProjectCard/ProjectCard";
import { ArrowLink } from "components/ArrowLink/ArrowLink.component";

import PROJECTS from "data/projects.json";
import BlogPostCard from "components/Blog/BlogPostCard.component";
import { FormEvent, useState } from "react";
import { Form, FormState } from "lib/types";
import ErrorMessage from "components/ErrorMessage";
import SuccessMessage from "components/SuccessMessage";
import { mutate } from "swr";
import Heatmap from "components/Github/Heatmap.component";
import LRProjectCard from "components/ProjectCard/LRProjectCard";
import Projects from "data/projects.json";
import ClickSound from "components/Sounds/ClickSound";
import toast from "react-hot-toast";
import { AlertOctagon, Send } from "react-feather";

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto pb-16 w-full">
        <IntroSection />
        <FeaturedPosts />
        {/* <FeaturedProjects /> */}
        {/* <Todo /> */}
        <section className="mt-16 w-full gap flex flex-col">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6">
            Featured Projects
          </h3>
          <div className="flex w-full gap-2 flex-col">
            {Projects?.data.map((p) => (
              <div key={p.title}>
                <ClickSound>
                  <LRProjectCard
                    title={p.title}
                    description={p.description}
                    href={p.href}
                    icon={null}
                  />
                </ClickSound>
              </div>
            ))}
          </div>
          <div className="flex mt-8 mb-8">
            <ArrowLink
              href="/projects"
              blank={false}
              text="View all projects"
            />
          </div>
        </section>
        <Work />
        <GithubSection />
        <ContactSection />
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
      <h1 className="text-primary font-bold text-3xl md:text-5xl tracking-tight mb-1">
        Todd Christensen
      </h1>
      <div className="flex flex-row items-center mb-4">
        <h2 className="text-secondary">Web Developer</h2>
        <span className="flex items-center text-sm">
          <span className="inline-block mx-2">/</span>
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Open to job offers
        </span>
      </div>
      <p className="mb-16">
        Realizing my ideas through code. California native, currently residing
        in the Philippines 🇵🇭
      </p>
    </div>
    <div className="avatar">
      <div className="w-[100px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto rounded-full filter grayscale hover:filter-none">
        <Image
          alt="Todd Christensen"
          layout="responsive"
          height={176}
          width={176}
          src="/avatar.jpg"
          // className="rounded-full filter transition-all"
        />
      </div>
    </div>
  </section>
);

const FeaturedPosts = () => {
  return (
    <section className="FeaturedPosts">
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6">
        Featured Posts
      </h3>
      <div className="flex gap-6 flex-col md:flex-row">
        <BlogPostCard
          title="Hello World"
          slug="hello-world"
          gradient="border-2 border-accent"
          // gradient="from-[#FCA5A5] via-[#EF4444] to-[#991B1B]"
        />
      </div>
      <div className="mt-8 mb-8">
        <ArrowLink href="blog" text="Read all posts" blank={false} />
      </div>
    </section>
  );
};

const FeaturedProjects = () => {
  return (
    <section id="FeaturedProjects" className="w-full relative">
      <h3 className="font-bold text-2xl text-secondary md:text-4xl tracking-tight mb-6 flex flex-row items-end justify-between w-full">
        Featured Projects{" "}
      </h3>

      <AwesomeSwiper>
        {PROJECTS.data.map((project, idx: number) => (
          <ProjectCard {...project} key={idx} />
        ))}
      </AwesomeSwiper>
      <div className="flex gap-20 w-full flex-col"></div>
      <div className="flex mt-8">
        <ArrowLink href="/projects" blank={false} text="View all projects" />
      </div>
    </section>
  );
};

const Todo = () => {
  return (
    <section id="Hobbies" className="glass">
      <h3 className="mt-16 text-secondary font-bold text-2xl md:text-4xl tracking-tight mb-6 flex flex-row items-end justify-between w-full">
        To do:{" "}
      </h3>
      <ol className="list-inside ml-8">
        <li>Github Section on homepage. includes the commit map/calendar</li>
        <li>blog (powered by hive blockchain)</li>
        <li>Resume</li>
        <li>Custom chat window with AI</li>
        <li>
          Hobbies page (music production, gaming production,{" "}
          <span className="line-through">books i've read</span>, travel
        </li>
      </ol>
    </section>
  );
};

const ContactSection = () => {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [body, setBody] = useState<string>();
  const [bodyHeight, setBodyHeight] = useState<boolean>(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch("/api/contact", {
      body: JSON.stringify({
        name,
        email,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();
    if (response.error) {
      toast("oops! something went wrong :( please try again.");
    }

    setName('');
    setEmail('');
    setBody('');

    mutate("/api/guestbook");
    
    toast.success("sent! i love you. have a nice day!");
  };

  return (
    <section id="Contact" className="w-full">
      <h3 className="mt-16 text-secondary font-bold text-2xl md:text-4xl tracking-tight mb-6 flex flex-row items-end justify-between w-full">
        Get in touch
      </h3>
      <div>
        <div className="ContactForm__wrapper rounded shadow w-full p-4 bg-base-200 text-primary-content">
          <form
            className="ContactForm flex flex-col"
            onSubmit={handleSendMessage}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-semibold">
                  Name
                </span>
              </label>
              <input
                required
                type="text"
                placeholder="name"
                className="input input-bordered text-secondary"
                value={name}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setName(event.currentTarget.value)
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-semibold">
                  Email
                </span>
              </label>
              <input
                required
                type="email"
                placeholder="email"
                className="input input-bordered text-secondary"
                value={email}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setEmail(event.currentTarget.value)
                }
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-base-content font-semibold">
                  What would you like to say?
                </span>
              </label>
              <textarea
                required
                onClick={() => setBodyHeight(true)}
                className={`textarea textarea-bordered text-secondary resize-none pb-[50px] ${
                  bodyHeight === true ? "h-72" : "h-42"
                }`}
                placeholder="message"
                value={body}
                onChange={(event: React.FormEvent<HTMLTextAreaElement>) =>
                  setBody(event.currentTarget.value)
                }
              ></textarea>
              <div className="w-full absolute bottom-0">
                <button
                  type="submit"
                  className="btn shadow rounded w-[calc(100%-8px)] m-1"
                >
                  Send it
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const GithubSection = () => {
  return (
    <section id="Github" className="w-full mb-8">
      <h3 className="mt-16 text-secondary font-bold text-2xl md:text-4xl tracking-tight mb-6 flex flex-row items-end justify-between w-full">
        Github Stats
      </h3>
      <p className="mb-16">
        Admittedly in the early stages of my career I didn't think much of git,
        or understand the potential it has. Recently, I have decided to make up
        for that. You can see my Github stats below, showing my overall
        activity.
      </p>
      {/* <img
        className="mb-4"
        src="https://raw.githubusercontent.com/trchristensen/github-stats/master/generated/overview.svg"
      /> */}
      <Heatmap />
    </section>
  );
};

const Work = () => (
  <section id="work" className="w-full mb-8">
    <h3 className="mt-16 text-secondary font-bold text-2xl md:text-4xl tracking-tight mb-6 flex flex-row items-end justify-between w-full">
      Work
    </h3>
    <div className="flex flex-col space-y-3">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://bytoddchristensen.com"
        className="flex items-center space-x-4 group"
      >
        <span className="flex-none font-medium group-hover:underline group-hover:text-accent">
          byToddChristensen (Freelance)
        </span>
        <span className="flex-shrink w-full border-t border-base-content border-dashed"></span>
        <span className="flex-none text-tertiary">Web Developer</span>
        <span className="flex-none font-mono text-quaternary">2018-</span>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://designstudio.com"
        className="flex items-center space-x-4 group"
      >
        <span className="flex-none font-medium group-hover:underline group-hover:text-accent">
          DesignStudio
        </span>
        <span className="flex-shrink w-full border-t border-base-content border-dashed"></span>
        <span className="flex-none text-tertiary">Web Developer</span>
        <span className="flex-none font-mono text-quaternary">2015-2018</span>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://myspace.com"
        className="flex items-center space-x-4 group"
      >
        <span className="flex-none font-medium group-hover:underline group-hover:text-accent">
          Myspace
        </span>
        <span className="flex-shrink w-full border-t border-base-content border-dashed"></span>
        <span className="flex-none text-tertiary">Profile Customizer</span>
        <span className="flex-none font-mono text-quaternary">2002-2006</span>
      </a>
    </div>
  </section>
);
