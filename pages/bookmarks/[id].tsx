import * as React from "react";

import { BookmarkDetail } from "components/Bookmarks/BookmarkDetail";
import { BookmarksList } from "components/Bookmarks/BookmarksList";
import { ListDetailView, SiteLayout } from "components/Layouts";
import { withProviders } from "components/Providers/withProviders";
import { getRaindropsFromCollection } from "lib/raindrop";
import { Bookmark } from "lib/types";


function BookmarkPage({ id, fallbackData }) {
  return <BookmarkDetail bookmark={fallbackData} id={id} />;
}

export async function getStaticProps({ params: { id }, req, res }) {


  const bookmarks = await getRaindropsFromCollection("21727662");

  const fallbackData = await bookmarks?.items.filter(_ => _._id == id).map((raindrop: Bookmark) => ({
    title: raindrop.title,
    id: raindrop._id.toString(),
    link: raindrop.link,
    excerpt: raindrop.excerpt,
    cover: raindrop.cover,
    tags: raindrop.tags,
    domain: raindrop.domain,
  }));


  return  {
    props: {
      id,
      fallbackData
    },
  }
}

export async function getStaticPaths(){

      const response = await getRaindropsFromCollection("21727662");
      const bookmarks = response.items;

      // Get the paths we want to pre-render based on posts
      const paths = bookmarks.map((bookmark: Bookmark) => ({
        params: { id: bookmark._id.toString() },
      }));

      // We'll pre-render only these paths at build time.
      // { fallback: blocking } will server-render pages
      // on-demand if the path doesn't exist.
      return { paths, 
        fallback: "blocking"
     };


}

BookmarkPage.getLayout = withProviders(function getLayout(page) {
    console.log("PAGE ------>", page)
  return (
    <SiteLayout>
      <ListDetailView list={<BookmarksList fallbackData={page} />} hasDetail detail={page} />
    </SiteLayout>
  );
});

export default BookmarkPage;
