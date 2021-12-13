import Image from "next/image";
import { parseISO, format } from "date-fns";

import Container from "components/Container/Container.component";
// import Subscribe from "components/Subscribe";
import ViewCounter from "components/ViewCounter/ViewCounter.component";
import { PropsWithChildren, useRef, useState } from "react";
import type { Blog } from ".contentlayer/types";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";
import { Form, FormState } from "lib/types";
import fetcher from "lib/fetcher";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";
import ErrorMessage from "components/ErrorMessage";
import SuccessMessage from "components/SuccessMessage";

const editUrl = (slug) =>
  `https://github.com/trchristensen/toddchristensen.net/edit/main/data/blog/${slug}.mdx`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://toddchristensen.net/blog/${slug}`
  )}`;

export default function BlogLayout({
  children,
  post,
  comments
}: PropsWithChildren<{ post: Blog, comments: any }>) {
  return (
    <Container
      title={`${post.title} – Todd Christensen`}
      description={post.summary}
      image={`http://toddchristensen.net/assets/${post.image}`}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-primary">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Todd Christensen"
              height={24}
              width={24}
              src="/avatar.jpg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm">
              {"Todd Christensen / "}
              {format(parseISO(post.publishedAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <p className="mt-2 text-sm min-w-32 md:mt-0">
            {post.readingTime.text}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          {children}
        </div>
        <div className="mt-8">
          {/* <Subscribe /> */}
        </div>
        <div className="text-sm">
          <a
            href={editUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"Edit on GitHub"}
          </a>
        </div>
        <section className="Comments">
          <CreateComment post={post} comments={comments} />
        </section>
      </article>
    </Container>
  );
}



export function CreateComment({ post, comments }) {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef(null);


  const leaveEntry = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });


    const res = await fetch("/api/blog", {
      body: JSON.stringify({
        body: inputEl.current.value,
        postSlug: post.slug
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

    inputEl.current.value = "";
    mutate("/api/blog");
    setForm({
      state: Form.Success,
      message: `Hooray! Comment posted`,
    });
  };

  return (
    <>
      <div className="shadow rounded bg-secondary-focus text-secondary-content p-6 my-4 w-full">
        <h5 className="text-lg md:text-xl font-bold">Leave a comment</h5>
        <p className="my-1">
          Let me know what you think of this fine piece of literature.
        </p>
        {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/api/auth/signin/github"
            className="btn shadow flex items-center justify-center my-4 font-bold h-8 rounded w-28"
            onClick={(e) => {
              e.preventDefault();
              signIn("github");
            }}
          >
            Login
          </a>
        )}
        {session?.user && (
          <form className="relative my-4" onSubmit={leaveEntry}>
            <input
              ref={inputEl}
              aria-label="Your comment"
              placeholder="Your comment..."
              required
              className="input input-bordered pl-4 pr-32 py-2 mt-1 block w-full rounded-md text-base-content"
            />
            <button
              style={{ minHeight: 40 }}
              className="btn btn-secondary shadow flex items-center justify-center absolute right-1 top-1 px-4 pt-1 font-medium h-8 rounded w-28"
              type="submit"
            >
              {form.state === Form.Loading ? <LoadingSpinner /> : "Sign"}
            </button>
          </form>
        )}
        {form.state === Form.Error ? (
          <ErrorMessage>{form.message}</ErrorMessage>
        ) : form.state === Form.Success ? (
          <SuccessMessage>{form.message}</SuccessMessage>
        ) : (
          <p className="text-sm">
            Your information is only used to display your name and reply by
            email.
          </p>
        )}
      </div>
      <div className="mt-4 space-y-4 w-full flex flex-col">
        {
          comments &&
            comments.map((comment) => (
              <GuestbookEntry entry={comment} user={session?.user} key={comment.id} />
            ))
          // comments.map((comment) => (
          //   // <GuestbookEntry key={entry.id} entry={entry} user={session?.user} />
          //   <div>
          //     <span className="text-body-content">{JSON.stringify(comment)}</span>
          //   </div>
          // ))
        }
      </div>
    </>
  );
}


function GuestbookEntry({ entry, user }) {
  const { mutate } = useSWRConfig();
  const deleteEntry = async (e) => {
    e.preventDefault();

    console.log('entry id', entry.id)

    await fetch(`/api/blog/${entry.id}`, {
      method: "DELETE",
    });

    mutate("/api/blog");

  };

  return (
    <div className="GuestbookEntry flex flex-row gap-4">
      {entry.createdBy.avatar && (
        <div className="avatar">
          <div className="mb-8 rounded shadow w-14 h-14">
            <img src={entry.createdBy.avatar} />
          </div>
        </div>
      )}
      <div className="GuestbookEntry__card rounded shadow card overflow-visible bg-base-200 p-2 sm:p-4 flex flex-col space-y-2 w-full before:content-[''] after:content-[''] before:bg-base-200 after:bg-base-200 before:w-[15px] before:h-[15px] before:absolute before:left-[-7px] before:top-[25%] before:transform before:rotate-45 before:rounded before:-z-1 before:shadow after:w-[15px] after:h-[15px] after:absolute after:left-[-7px] after:top-[25%] after:transform after:rotate-45 after:rounded">
        <div className="w-full text-medium">{entry.body}</div>
        <div className="flex items-center space-x-3">
          <p className="text-sm text-base-content">{entry.createdBy.name}</p>
          <span className="opacity-40">/</span>
          <p className="text-sm text-base-content">
            {format(new Date(entry.createdAt), "d MMM yyyy 'at' h:mm bb")}
          </p>
          {user && entry.createdBy.email === user.email && (
            <>
              <span className="opacity-40">/</span>
              <button className="text-sm text-accent" onClick={deleteEntry}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
