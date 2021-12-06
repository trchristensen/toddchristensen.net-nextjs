import prisma from "lib/prisma";
import Container from "components/Container/Container.component";
import { Raindrop } from "lib/types";
import useSWR from "swr";
import fetcher from "lib/fetcher";
import Image from "next/image";
import { getRaindropsFromCollection } from "lib/raindrop";
import { useEffect, useState } from "react";

function GridView({ bookmarks }) {
  return (
    <div className="w-full relative grid base: grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {bookmarks?.items &&
        bookmarks.items.map(({ link, cover, title, tags }) => (
          <div className="mb-[-8px]">
            <a
              className="w-full h-full"
              data-tip={title}
              href={link}
              target="_blank"
            >
              <div className="Bookmark__icon w-full">
                <div
                  style={{
                    aspectRatio: "1/1",
                    backgroundImage: `url('${cover}')`,
                  }}
                  className="flex bg-center rounded-btn shadow-xl object-center bg-cover min-w-32 min-h-32 w-full h-full flex-col justify-between"
                >
                  <div className="w-full h-full opacity-0 hover:bg-base-100 hover:opacity-100 flex justify-center items-center flex-col gap-4 p-4 transition-opacity duration-500 ease-in-out">
                  {/* begin */}
                  <div className="text-sm font-medium leading-snug">
                    <span className="">{title}</span>
                  </div>
                  <div className="flex flex-wrap space-evenly gap-1 p-1 w-full justify-center">
                    {tags &&
                      tags
                        .slice(0, 3)
                        .map((tag) => (
                          <span className="badge badge-sm badge-accent text-accent-content text-xs">
                            {tag}
                          </span>
                        ))}
                  </div>
                  {/* end */}
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
    </div>
  );
}

function ListView({ bookmarks }) {
  return (
    <div className="flex flex-col gap-1">
      {bookmarks?.items &&
        bookmarks?.items.map(
          ({ title, excerpt, link, id, cover, tags, domain }) => (
            <div
              key={id}
              className="card flex w-full flex-row relative items-center gap-4 border-b-2 border-base-200 rounded-none p-1 sm:p-2 py-4"
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
                  <span className="block text-xs line-clamp-2">{excerpt}</span>
                </div>

                <div className="flex gap-1">
                  {tags.map((tag, idx) => (
                    <span className="badge badge-ghost text-xs p">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
}

export default function BookmarksPage({ fallbackData }) {
  const { data: bookmarks } = useSWR(
    "/api/bookmarks/raindrops?collectionId=21727662",
    fetcher,
    {
      fallbackData,
    }
  );

  const [view, setView] = useState("list");
  const handleChangeView = () => {
    const newView = view == "list" ? "grid" : "list";
    setView(newView);
    localStorage.setItem("view-type", newView);
  };

  useEffect(() => {
    setView(localStorage.getItem("view-type"));
  }, []);

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
        <div className="flex justify-end items-center w-full mb-4 gap-4">
          <button className="btn btn-outline btn-sm" onClick={handleChangeView}>
            { view == "list" ? "grid" : "list" } View
          </button>
        </div>

        {view == "list" ? (
          <ListView bookmarks={bookmarks} />
        ) : (
          <GridView bookmarks={bookmarks} />
        )}
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

  const bookmarks = await getRaindropsFromCollection("21727662");

  const fallbackData = await bookmarks?.items.map((raindrop:Raindrop) => ({
    title: raindrop.title,
    id: raindrop._id.toString(),
    link: raindrop.link,
    excerpt: raindrop.excerpt,
    cover: raindrop.cover,
    tags: raindrop.tags,
    domain: raindrop.domain,
  }));

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
}
