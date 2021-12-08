import Link from "next/link";
// import { NextSeo } from "next-seo";
import * as React from "react";
import { Link as LinkIcon } from "react-feather";

import { PrimaryButton } from "components/Button";
// import { Comments } from "components/Comments";
import { Detail } from "components/ListDetail/Detail";
import { TitleBar } from "components/ListDetail/TitleBar";
import { Bookmark } from "lib/types";
import { Tags } from "components/Tag";
// import { Tags } from "components/Tag";
// import routes from "config/routes";
// import { CommentType, useGetBookmarkQuery } from "graphql/types.generated";

// import { MarkdownRenderer } from "../MarkdownRenderer";
// import { BookmarkActions } from "./BookmarkActions";
// import { RelatedBookmarks } from "./RelatedBookmarks";

export function BookmarkDetail({
  id,
  bookmark,
}: {
  id: string;
  bookmark: Bookmark;
}) {
  const scrollContainerRef: React.RefObject<HTMLDivElement> =
    React.useRef(null);
  const titleRef: React.RefObject<HTMLHeadingElement> = React.useRef(null);

  //   get bookmark data from parent (page)
  // get comments and other stuff from db

  return (
    <>
      {bookmark && (
        <Detail.Container data-cy="bookmark-detail" ref={scrollContainerRef}>
          <TitleBar
            backButton
            globalMenu={false}
            backButtonHref={"/bookmarks"}
            magicTitle
            title={bookmark.title}
            titleRef={titleRef}
            scrollContainerRef={scrollContainerRef}
            // trailingAccessory={<BookmarkActions bookmark={bookmark} />}
            trailingAccessory={<>Likes</>}
          />
          <Detail.ContentContainer>
            <Detail.Header>
              <Tags tags={bookmark.tags} />
              <Link href={bookmark.link || ""}>
                <a target="_blank" rel="noopener" className="block">
                  <Detail.Title ref={titleRef}>{bookmark.title}</Detail.Title>
                </a>
              </Link>
              <Link href={bookmark.link || ""}>
                <a
                  target="_blank"
                  rel="noopener"
                  className="flex items-center space-x-2 leading-snug text-tertiary"
                >
                  {bookmark.cover && (
                    <img
                      src={bookmark.cover}
                      alt={`Favicon for ${bookmark.domain}`}
                      className="w-4 h-4"
                      width="16px"
                      height="16px"
                    />
                  )}
                  <span>{bookmark.domain}</span>
                </a>
              </Link>
              {bookmark.excerpt && (
                //   <MarkdownRenderer
                //     className="italic prose opacity-70"
                //     children={bookmark.excerpt}
                //     variant="comment"
                //   />
                <span className="text-base-content">{bookmark.excerpt}</span>
              )}
            </Detail.Header>
            <div className="mt-6">
              <PrimaryButton
                size="large"
                href={bookmark.link || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon size={14} />
                <span>Visit</span>
              </PrimaryButton>
            </div>
          </Detail.ContentContainer>

          {/* <RelatedBookmarks bookmark={bookmark} /> */}

          {/* <Comments refId={bookmark.id} type={CommentType.Bookmark} /> */}
        </Detail.Container>
      )}
    </>
  );
}
