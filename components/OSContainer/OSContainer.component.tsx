import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import cn from "classnames";
import Footer from "components/Footer/Footer.component";
import MobileMenu from "components/MobileMenu/MobileMenu.component";
import { site } from "config/site.config";
import ChangeTheme from "components/ChangeTheme/ChangeTheme.component";
import CurrentTime from "components/CurrentTime/CurrentTime.component";
import NowPlaying from "components/Spotify/NowPlaying.component";
import { GlobalNavigationContext } from "components/Providers";

import { signIn, useSession } from "next-auth/react";


function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive ? "font-semibold" : "font-normal",
          "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-base-200 transition-all"
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function OSContainer(props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Todd Christensen – Developer, JavaScript enthusiast.",
    description: `Front-end developer, JavaScript enthusiast.`,
    // image: "https://toddchristensen.net/static/images/banner.png",
    type: "website",
    ...customMeta,
  };
  return (
    <div
      id="os"
      style={
        {
          // position: "fixed",
          // zIndex: 9999,
          // top: 16,
          // left: 16,
          // right: 16,
          // bottom: 16,
          // pointerEvents: "none",
        }
      }
    >
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://toddchristensen.net${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://toddchristensen.net${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Todd Christensen" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shillainmanila" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <div className="relative flex w-full h-full min-h-screen">
        <Sidebar />
        <div className="fixed bg-opacity-5 dark:bg-opacity-50 transition duration-200 ease-in-out inset-0 z-20 opacity-0 pointer-events-none"></div>

        <main id="skip" className="flex flex-1">
          <div className="flex w-full">
            <div className="relative flex flex-col w-full max-h-screen overflow-y-auto">
              <div className="StatusBar min-h-12 w-full flex items-center justify-between px-4 bg-base-200 sticky top-0 z-10 bg-opacity-90 filter-blur">
                <TitleBar title={null} backButton={null} />
                <div className="StatusBar__left flex items-center"></div>
                <div className="StatusBar__right"></div>
              </div>
              <div className="p-4"></div>
              <div className="px-2">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

