import prisma from "lib/prisma";
import Container from "components/Container/Container.component";
import Guestbook from "components/Guestbook/Guestbook.component";
import OSContainer from "components/OSContainer/OSContainer.component";

export default function GuestbookPage({ fallbackData }) {
  return (
    <OSContainer
      title={`Guestbook – ${process.env.SITE_NAME}`}
      description="Sign my digital guestbook and share some wisdom."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="text-primary font-bold text-3xl md:text-5xl tracking-tight mb-4">
          Guestbook
        </h1>
        <p className="mb-4">
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </p>
        <Guestbook fallbackData={fallbackData} />
      </div>
    </OSContainer>
  );
}

export async function getStaticProps() {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: "desc",
    },
  });

  const fallbackData = entries.map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    avatar_src: entry.avatar_src,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString(),
  }));

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
}
