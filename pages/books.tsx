import prisma from "lib/prisma";
import Container from "components/Container/Container.component";
import Books from "components/Books/Books.component";
import { book } from ".prisma/client";
import { BigIntToString } from "lib/utils";

export default function BookPage({ fallbackData }) {
  return (
    <Container
      title="Guestbook – Todd Christensen"
      description="Sign my digital guestbook and share some wisdom."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="text-primary font-bold text-3xl md:text-5xl tracking-tight mb-4">
          Books
        </h1>
        <p className="mb-8">
          I try to read as much as I can. This is a list of the books I've recently read, am currently reading, and am going to read. I read non-fiction almost exclusively but am open to reading just about anything. You can also recommend any books if you'd like, at the bottom of the page. Might add a comments feature if this page gets any engagement, at all.
        </p>
        <Books fallbackData={fallbackData} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const entries = await prisma.book.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      createdBy: true
    }
  });

  const fallbackData = JSON.parse(BigIntToString(entries))

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
}
