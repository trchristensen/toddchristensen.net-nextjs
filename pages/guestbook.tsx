import prisma from "lib/prisma";
import Container from "components/Container/Container.component";
import Guestbook from "components/Guestbook/Guestbook.component";
import { BigIntToString } from "lib/utils";

export default function GuestbookPage({ fallbackData }) {
  return (
    <Container
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
    </Container>
  );
}

export async function getStaticProps() {
  const entries = await prisma?.guestbookEntry.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      createdBy: true
    }
  });

  const fallbackData = JSON.parse(BigIntToString(entries))
  
  return {
    props: {
      fallbackData: fallbackData,
    },
    revalidate: 60,
  };
}
