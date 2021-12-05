import prisma from "lib/prisma";
import Container from "components/Container/Container.component";
import { Raindrop } from "lib/types";
import useSWR from "swr";
import fetcher from "lib/fetcher";
import Image from "next/image";

export default function BookmarksPage({ fallbackData }) {
  const { data: bookmarks } = useSWR(
    "http://localhost:3000/api/bookmarks/raindrops?collectionId=21727662",
    fetcher,
    {
      fallbackData,
    }
  );

  return (
    <Container
      title={`Bookmarks – ${process.env.SITE_NAME}`}
      description="Sign my digital guestbook and share some wisdom."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="text-primary font-bold text-3xl md:text-5xl tracking-tight mb-4">
          Bookmarks
        </h1>
        <p className="mb-4">
          These are some bookmarks I thought you might find useful or enjoy.
          They are synced straight from raindrops.io
        </p>
        <div className="flex flex-col gap-1">
          {bookmarks.items &&
            bookmarks.items.map(
              ({ title, excerpt, link, id, cover, tags, domain }) => (
                <div
                  key={id}
                  className="card flex w-full flex-row relative items-center gap-4 rounded bg-base-200 p-1 sm:p-2 py-4"
                >
                  <a href={link} target="_blank">
                    <div className="avatar Bookmark__icon">
                      <div className="rounded-btn shadow-xl w-16 h-16">
                        <img src={cover} alt={title} />
                      </div>
                    </div>
                  </a>
                  <div className="Bookmark__content flex flex-col gap-4">
                    <div>
                      <a href={link} target="_blank">
                        <span className="block font-medium line-clamp-1">
                          {title}
                        </span>
                      </a>
                      <span className="block text-sm line-clamp-2">
                        {excerpt}
                      </span>
                    </div>

                    <div className="flex gap-0">
                      {tags.map((tag, idx) => (
                        <span className="badge badge-ghost text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
        </div>

        {/* <Guestbook fallbackData={fallbackData} /> */}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: "desc",
    },
  });

  const bookmarks = await fetch(
    "http://localhost:3000/api/bookmarks/raindrops/?collectionId=21727662"
  )
    .then((res) => res.json())
    .then((data) => data.items)
    .catch((err) => err);

  const fallbackData = bookmarks.map((raindrop) => ({
    title: raindrop.title,
    id: raindrop._id.toString(),
    link: raindrop.link,
    excerpt: raindrop.excerpt,
    cover: raindrop.cover,
    tags: raindrop.tags,
    domain: raindrop.domain,
  }));

  console.log("fbdata", fallbackData);

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
}
