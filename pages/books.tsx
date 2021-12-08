import prisma from "lib/prisma";
import Container from "components/Container/Container.component";
import Books from "components/Books/Books.component";
import { books } from ".prisma/client";
import OSContainer from "components/OSContainer/OSContainer.component";
import { withProviders } from "components/Providers/withProviders";
import { useState } from "react";
import { ListDetailView, SiteLayout } from "components/Layouts";

export default function BookPage({ fallbackData }) {
  return (
    <>
    </>
  );
}

export async function getStaticProps() {
  const entries = await prisma.books.findMany({
    orderBy: {
      updated_at: "desc",
    },
  });

  console.log(entries)

  const fallbackData = entries.map((entry: books) => ({
    id: entry.id.toString(),
    title: entry.title,
    author: entry.author,
    description: entry.description,
    rating: entry.rating,
    created_at: entry.created_at.toString(),
    updated_at: entry.updated_at.toString(),
    subtitle: entry.subtitle,
    num_pages: entry.num_pages,
    cover_src: entry.cover_src,
    publish_date: entry.publish_date,
    subjects: entry.subjects,
    key: entry.key,
    comment: entry.comment,
    created_by: entry.created_by,
    read_status: entry?.read_status,
  }));

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
}

BookPage.getLayout = withProviders(function getLayout(page) {
  const [scrollContainerRef, setScrollContainerRef] = useState(null);

  return (
    <SiteLayout>
      <ListDetailView
        list={<> {JSON.stringify(fallbackData)} </>}
        // list={<ListContainer children={null} onRef={setScrollContainerRef} />}
        hasDetail={false}
        detail={page}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="text-primary font-bold text-3xl md:text-5xl tracking-tight mb-4">
          Books
        </h1>
        <p className="mb-8">
          I try to read as much as I can. This is a list of the books I've
          recently read, am currently reading, and am going to read. I read
          non-fiction almost exclusively but am open to reading just about
          anything. You can also recommend any books if you'd like, at the
          bottom of the page. Might add a comments feature if this page gets any
          engagement, at all.
        </p>
      </div>
    </SiteLayout>
  );
});
