import { useMDXComponent } from "next-contentlayer/hooks";
// import { getTweets } from "lib/twitter";
import components from "components/MDXComponents/MDXComponents";
import BlogLayout from "layouts/blog";
// import Tweet from "components/Tweet";
import { allBlogs } from ".contentlayer/data";
import type { Blog } from ".contentlayer/types";
import prisma from "lib/prisma";
import { BigIntToString } from "lib/utils";
import useSWR from "swr";
import { comment, post } from ".prisma/client";
import fetcher from "lib/fetcher";

export default function Post({ post, tweets, comments }: { post: Blog; tweets: any[], comments: any }) {
  const Component = useMDXComponent(post.body.code);
  // const StaticTweet = ({ id }) => {
  //   const tweet = tweets.find((tweet) => tweet.id === id);
  //   return <Tweet {...tweet} />;
  // };

const { data, error } = useSWR<any>(`/api/blog/}`, fetcher);

  return (
    <BlogLayout post={post} comments={comments}>
      <Component
        components={
          {
            ...components,
            // StaticTweet,
          } as any
        }
      />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug);

   const comments = await prisma?.comment.findMany({
     where: {
       post: {
         slug: params.slug,
       },
     },
     orderBy: {
       createdAt: "asc",
     },
     include: {
       createdBy: true,
     },
   });

   const stringd = JSON.parse(BigIntToString(comments))

  return {
    props: {
      post,
      comments: stringd,
    },
    revalidate: 60,
  };
}

