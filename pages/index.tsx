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

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto pb-16 w-full">
        <IntroSection />
        <FeaturedPosts />
        <FeaturedProjects />
        <Todo />
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
        <BlogPostCard
          title="Rust Is The Future of JavaScript Infrastructure"
          slug="rust"
          gradient="border-2 border-accent"
          // gradient="from-[#FCA5A5] via-[#EF4444] to-[#991B1B]"
        />
        <BlogPostCard
          title="Past, Present, and Future of React State Management"
          slug="react-state-management"
          gradient="border-2 border-accent"
          // gradient="from-[#FCA5A5] via-[#EF4444] to-[#991B1B]"
        />
      </div>
      <div className="mt-8 mb-16">
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

const Todo = () => (
  <section id="Hobbies">
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

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    setName(null)
    setEmail(null)
    setBody(null)

    mutate("/api/guestbook");
    setForm({
      state: Form.Success,
      message: `Hooray! Thanks for the message! I'll get in touch with you shortly.`,
    });

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
                className={`textarea textarea-bordered text-secondary resize-none pb-[50px] ${bodyHeight === true ? 'h-72' : 'h-42'}`}
                placeholder="message"
                value={body}
                onChange={(event: React.FormEvent<HTMLTextAreaElement>) =>
                  setBody(event.currentTarget.value)
                }
              ></textarea>
              <div className="w-full absolute bottom-0">
                <button type="submit" className="btn shadow rounded w-[calc(100%-8px)] m-1">
                  Send it
                </button>
              </div>
            </div>
          </form>
          {form.state === Form.Error ? (
            <ErrorMessage>{form.message}</ErrorMessage>
          ) : form.state === Form.Success ? (
            <SuccessMessage>{form.message}</SuccessMessage>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};
