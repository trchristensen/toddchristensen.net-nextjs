import prisma from "lib/prisma";
import Container from "components/Container/Container.component";
import Books from "components/Books/Books.component";

export default function BookPage({ fallbackData }) {
  return (
    <Container
      title="Guestbook – Lee Robinson"
      description="Sign my digital guestbook and share some wisdom."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Books I've read
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          This is a list of the books I've recently read. This list is more for
          me to keep track, than anything.
        </p>
        <Books fallbackData={fallbackData} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const entries = await prisma.books.findMany({
    orderBy: {
      updated_at: "desc",
    },
  });

  const fallbackData = entries.map((entry) => ({
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
  }));

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
}
