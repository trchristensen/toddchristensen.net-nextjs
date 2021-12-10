import prisma from "lib/prisma";
import Container from "components/Container/Container.component";
import { Raindrop } from "lib/types";
import useSWR from "swr";
import fetcher from "lib/fetcher";
import Image from "next/image";
import { getRaindropsFromCollection } from "lib/raindrop";
import { useEffect, useState } from "react";
import cn from "classnames";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";

function BookmarkFilter({onChange, categoryValue}) {


  return (
    <div className="BookmarkFilter flex flex-row gap-4 items-center">
      <button
        className={cn(
          categoryValue == "21727662"
            ? "font-semibold bg-base-200"
            : "font-normal",
          "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-base-200 transition-all"
        )}
        onClick={() => onChange("portfolio")}
      >
        Portfolio
      </button>
      <button
        className={cn(
          categoryValue == "21810124"
            ? "font-semibold bg-base-200"
            : "font-normal",
          "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-base-200 transition-all"
        )}
        onClick={() => onChange("tool")}
      >
        Tool
      </button>
      <button
        className={cn(
          categoryValue == "21810130"
            ? "font-semibold bg-base-200"
            : "font-normal",
          "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-base-200 transition-all"
        )}
        onClick={() => onChange("article")}
      >
        Article
      </button>
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
  
  
  const [category, setCategory] = useState('21727662')

  const { data: bookmarks, error } = useSWR(
    "/api/bookmarks/raindrops?collectionId=" + category,
    fetcher,
    {fallbackData}
  );
  

  const handleCategoryChange = (category) => {
    const collections = {
      portfolio: "21727662",
      tool: "21810124",
      article: "21810130",
    };
    setCategory(collections[category])
    
  }

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
          <BookmarkFilter
            onChange={handleCategoryChange}
            categoryValue={category}
          />
        </div>

        {error &&  JSON.stringify(error)}
        {!bookmarks && <span className="text-base-content text-3xl">Loading...</span>}
        {bookmarks && <ListView bookmarks={bookmarks} />}
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
