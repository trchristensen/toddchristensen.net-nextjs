import {
  AMAIcon,
  AppDissectionIcon,
  BookmarksIcon,
  ExternalLinkIcon,
  FigmaIcon,
  GitHubIcon,
  HackerNewsIcon,
  HomeIcon,
  PodcastIcon,
  SecurityChecklistIcon,
  StackIcon,
  StaffDesignIcon,
  TwitterIcon,
  WritingIcon,
} from "components/Icon";
import { useRouter } from "next/router";
import { NavigationLink } from "./NavigationLink";


export function SidebarNavigation() {
  const router = useRouter();

  const links = [
    {
      href: "/",
      label: "Home",
      icon: HomeIcon,
      trailingAccessory: null,
      isActive: router.asPath === "/",
      trailingAction: null,
      isExternal: false,
    },

    {
      href: "/thoughts",
      label: "Thoughts",
      icon: WritingIcon,
      trailingAccessory: null,
      isActive: router.asPath.indexOf("/thoughts") >= 0,
      trailingAction: null,
      isExternal: false,
    },

    "Me",

    {
      href: "/guestbook",
      label: "Guestbook",
      icon: BookmarksIcon,
      trailingAccessory: null,
      isActive: router.asPath.indexOf("/guestbook") >= 0,
      // trailingAction: data?.viewer?.isAdmin ? ThisAddBookmarkDialog : null,
      trailingAction: null,
      isExternal: false,
    },

    {
      href: "/bookmarks",
      label: "Bookmarks",
      icon: BookmarksIcon,
      trailingAccessory: null,
      isActive: router.asPath.indexOf("/bookmarks") >= 0,
      // trailingAction: data?.viewer?.isAdmin ? ThisAddBookmarkDialog : null,
      trailingAction: null,
      isExternal: false,
    },
    {
      href: "/books",
      label: "Books",
      icon: BookmarksIcon,
      trailingAccessory: null,
      isActive: router.asPath.indexOf("/books") >= 0,
      // trailingAction: data?.viewer?.isAdmin ? ThisAddBookmarkDialog : null,
      trailingAction: null,
      isExternal: false,
    },

    {
      href: "/stack",
      label: "Stack",
      icon: StackIcon,
      trailingAccessory: null,
      isActive: router.asPath.indexOf("/stack") >= 0,
      trailingAction: null,
      isExternal: false,
    },

    "Projects",

    {
      href: "https://christy.vercel.app",
      label: "Christy Vault Co.",
      icon: StackIcon,
      trailingAccessory: ExternalLinkIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },

    {
      href: "https://dstack-zeta.vercel.app",
      label: "stackd",
      icon: StackIcon,
      trailingAccessory: ExternalLinkIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },

    {
      href: "https://binance-taker-trades.herokuapp.com/",
      label: "Binance Trades",
      icon: StackIcon,
      trailingAccessory: ExternalLinkIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },
    {
      href: "https://react-portfolio-red.vercel.app/",
      label: "Portfolio v2",
      icon: StackIcon,
      trailingAccessory: ExternalLinkIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },

    "Online",

    {
      href: "https://twitter.com/christensen_tr",
      label: "Twitter",
      icon: TwitterIcon,
      trailingAccessory: ExternalLinkIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },

    {
      href: "https://github.com/trchristensen",
      label: "GitHub",
      icon: GitHubIcon,
      trailingAccessory: ExternalLinkIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },
  ];

  return (
    <ul className="flex-1 px-3 py-3 space-y-1">
      {links.map((link, i) => {
        if (typeof link === "string") {
          return (
            <li
              key={i}
              className="px-2 pt-5 pb-2 text-xs font-semibold text-opacity-40"
            >
              {link}
            </li>
          );
        }

        return <NavigationLink key={i} link={link} />;
      })}
    </ul>
  );
}
