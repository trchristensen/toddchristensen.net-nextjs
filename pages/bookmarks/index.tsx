import { BookmarksList } from "components/Bookmarks/BookmarksList";
import { ListDetailView, SiteLayout } from "components/Layouts";
import { ListContainer } from "components/ListDetail/ListContainer";
import { withProviders } from "components/Providers/withProviders";
import prisma from "lib/prisma";
import { getRaindropsFromCollection } from "lib/raindrop";
import { Bookmark } from "lib/types";
import { useState } from "react";

function BookmarksPage({ fallbackData }) {

  return (
    <></>
  );
}


export async function getStaticProps() {


  const bookmarks = await getRaindropsFromCollection("21727662");

  const fallbackData = await bookmarks?.items.map((raindrop: Bookmark) => ({
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


BookmarksPage.getLayout = withProviders(function getLayout(page) {
  const [scrollContainerRef, setScrollContainerRef] = useState(null);
  
  return (
    <SiteLayout>
      <ListDetailView
        list={<BookmarksList fallbackData />}
        // list={<ListContainer children={null} onRef={setScrollContainerRef} />}
        hasDetail={false}
        detail={page}
      />
    </SiteLayout>
  );
});

export default BookmarksPage;


