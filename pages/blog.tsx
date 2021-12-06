import Link from "next/link";
import { allBlogs } from ".contentlayer/data";
import { useMemo, useState } from "react";
import Container from "components/Container/Container.component";
import { pick } from "lib/utils";
import { InferGetStaticPropsType } from "next";
import BlogPost from "components/Blog/BlogPost.component";
import prisma from "lib/prisma";
// import { Blog } from ".contentlayer/types";
import useSWR from "swr";
import fetcher from "lib/fetcher";


export default function Blog({
  posts,
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  const { data: popularPosts } = useSWR("/api/views/popular-posts", fetcher, {
    fallbackData,
  });

  
  return (
    <Container
      title="Blog – Todd Christensen"
      description="The ramblings of an incoherent, self-important, nobody."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          Blog
        </h1>
        <p className="mb-4">
          I just started my first blog, as of December 2021. I think it will
          start off as a personal diary, knowing it won't get much traffic. But
          who knows? Maybe it will turn into something beautiful? My mom
          always told me I'm very smart and creative.
        </p>
        <p className="mb-4">
          {` In total, I've written ${posts.length} articles on my blog.
            Use the search below to filter by title.`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="input input-bordered block w-full px-4 py-2 border rounded-md"
          />
          <svg
            className="absolute w-5 h-5 right-3 top-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!searchValue && (
          <>
            <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight ">
              Most Popular
            </h3>
            {
              // @ts-ignore
              popularPosts &&
                // @ts-ignore
                popularPosts.map((_) => {
                  return posts.map((post) => {
                    if (post.slug === _.slug)
                      return (
                        <BlogPost
                          title={post.title}
                          summary={post.summary}
                          slug={post.slug}
                        />
                      );
                  });
                })
            }
            {/* <BlogPost
              title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
              summary="A deep-dive on everything I've learned in the past year building style guides, design systems, component libraries, and their best practices."
              slug="style-guides-component-libraries-design-systems"
            />
            <BlogPost
              title="How Stripe Designs Beautiful Websites"
              summary="Examining the tips and tricks used to make Stripe's website design a notch above the rest."
              slug="how-stripe-designs-beautiful-websites"
            />
            <BlogPost
              title="Creating a Monorepo with Lerna & Yarn Workspaces"
              summary="In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process."
              slug="monorepo-lerna-yarn-workspaces"
            /> */}
          </>
        )}
        <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight">
          All Posts
        </h3>
        {!filteredBlogPosts.length && <p className="mb-4">No posts found.</p>}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = allBlogs.map((post) =>
    pick(post, ["slug", "title", "summary", "publishedAt"])
  );
  const popularPosts = await prisma.views.findMany({
    orderBy: {
      count: "desc",
    },
  });

  const fallbackData = popularPosts
    .map((entry) => {
      return posts.filter((post) => post.slug === entry.slug);
    })
    .slice(0, 3);

  return { props: { posts, fallbackData } };
}
