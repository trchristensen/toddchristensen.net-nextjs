import { Bookmark } from "lib/types";
import * as React from "react";
import { Link } from "react-feather";
import ReactVisibilitySensor from "react-visibility-sensor";
import { ListItem } from "components/ListDetail/ListItem";
// import { BookmarkListItemFragment } from "~/graphql/types.generated";

interface Props {
//   bookmark: BookmarkListItemFragment;
  bookmark: Bookmark;
  active: boolean;
}

export const BookmarksListItem = React.memo<Props>(({ bookmark, active }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  function handleClick(e, bookmark) {
    if (e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      window.open(bookmark.url, "_blank").focus();
    }
  }

  return (
    <ReactVisibilitySensor
      partialVisibility
      onChange={(visible: boolean) => !isVisible && setIsVisible(visible)}
    >
      <ListItem
        key={bookmark._id}
        title={bookmark.title}
        byline={
          <div className="flex items-center space-x-2">
            {bookmark.cover && isVisible ? (
              <img
                src={bookmark.cover}
                alt={`Favicon for ${bookmark.domain}`}
                className="w-4 h-4 rounded"
                width="16px"
                height="16px"
              />
            ) : (
              <span className="flex items-center justify-center w-4 h-4">
                <Link size={12} />
              </span>
            )}
            <span>{bookmark.domain}</span>
          </div>
        }
        active={active}
        href="/bookmarks/[id]"
        as={`/bookmarks/${bookmark._id}`}
        onClick={(e) => handleClick(e, bookmark)}
      />
      
    </ReactVisibilitySensor>
  );
});
