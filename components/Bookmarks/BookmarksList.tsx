import { LayoutGroup, motion } from "framer-motion";
import { useRouter } from "next/router";
import * as React from "react";

import { ListContainer } from "components/ListDetail/ListContainer";
// import { PAGINATION_AMOUNT } from "~/graphql/constants";
// import { useGetBookmarksQuery } from "~/graphql/types.generated";
// import { ListLoadMore } from "../ListDetail/ListLoadMore";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";
import useSWR from "swr";
import fetcher from "lib/fetcher";
import { TitleBar } from "components/ListDetail/TitleBar";
import { Bookmark } from "lib/types";
import { BookmarksListItem } from "./BookmarkListItem";
import { BookmarksTitlebar } from "./BookmarksTitleBar";

export const BookmarksContext = React.createContext({
  tag: null,
  setTag: (tag: string) => {},
});

export function BookmarksList({ fallbackData }) {
  const router = useRouter();
  const tagQuery = router.query?.tag as string;
  const [tag, setTag] = React.useState(tagQuery);
  const [isVisible, setIsVisible] = React.useState(false);
  const [scrollContainerRef, setScrollContainerRef] = React.useState(null);

  const { data, error } = useSWR(
    "/api/bookmarks/raindrops?collectionId=21727662",
    fetcher,
    {
      fallbackData,
    }
  );

  if (!data) {
    return (
      <ListContainer onRef={setScrollContainerRef}>
        {/* <BookmarksTitlebar scrollContainerRef={scrollContainerRef} /> */}
        <TitleBar title="Bookmarks" scrollContainerRef={scrollContainerRef} />
        <div className="flex items-center justify-center flex-1">
          <LoadingSpinner />
        </div>
      </ListContainer>
    );
  }

  if (error) {
    console.log(error);
    return null;
  }

  const { bookmarks } = data;

  console.log("====> ", bookmarks);
  return (
    <BookmarksContext.Provider value={data}>
      <ListContainer data-cy="bookmarks-list" onRef={setScrollContainerRef}>
        {/* <BookmarksTitlebar scrollContainerRef={scrollContainerRef} /> */}
        <TitleBar title="Bookmarks" scrollContainerRef={scrollContainerRef} />
        <LayoutGroup>
          <div className="lg:p-3 lg:space-y-1">
            {data.items &&
              data?.items?.map((bookmark: Bookmark) => {
                const active = router.query.id === bookmark._id;
                return (
                  <motion.div layout key={bookmark._id}>
                    <BookmarksListItem active={active} bookmark={bookmark} />
                  </motion.div>
                );
              })}
          </div>

          {/* {bookmarks.pageInfo.hasNextPage && (
            // <ListLoadMore setIsVisible={setIsVisible} />
            <></>
          )} */}
        </LayoutGroup>
      </ListContainer>
    </BookmarksContext.Provider>
  );
}
