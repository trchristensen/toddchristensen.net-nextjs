import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import cn from "classnames";
import Footer from "components/Footer/Footer.component";
import MobileMenu from "components/MobileMenu/MobileMenu.component";
import { site } from "config/site.config";
import ChangeTheme from "components/ChangeTheme/ChangeTheme.component";

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

export default function Container(props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Todd Christensen – Developer, JavaScript enthusiast.",
    description: `Front-end developer, JavaScript enthusiast.`,
    // image: "https://leerob.io/static/images/banner.png",
    type: "website",
    ...customMeta,
  };
  return (
    <div
      id="os"
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 16,
        left: 16,
        right: 16,
        bottom: 16,
        pointerEvents: "none",
      }}
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
        <nav className="absolute -translate-x-full lg:relative flex flex-none flex-col lg:translate-x-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-56 2xl:w-72 3xl:w-80 z-30 lg:z-auto max-h-screen h-full min-h-screen overflow-y-auto transition duration-200 ease-in-out transform bg-white border-r pb-10 sm:pb-0 border-gray-150 dark:bg-gray-900 dark:border-gray-800 ">
          <div
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0)", minHeight: "48px" }}
            className="sticky top-0 z-10 flex justify-center flex-col px-3 py-2 bg-opacity-90 filter-blur "
          >
            <div className="flex items-center justify-between flex-none">
              <span className="flex items-center space-x-3">
                <span className="flex items-center justify-center p-2 rounded-md cursor-pointer lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="text-primary"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </span>
                <p className="text-sm font-bold transform-gpu text-primary line-clamp-1">
                  Todd Christensen
                </p>
              </span>
            </div>
            <div></div>
          </div>
          <ul className="flex-1 px-3 py-3 space-y-1">
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  bg-black text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:hover:bg-gray-700 dark:text-white dark:hover:text-white"
                href="/"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                </span>
                <span className="flex-1">Home</span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="/writing"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clip-rule="evenodd"
                    ></path>
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                  </svg>
                </span>
                <span className="flex-1">Writing</span>
              </a>
            </li>
            <li className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 dark:text-white text-opacity-40">
              Me
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="/bookmarks"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                  </svg>
                </span>
                <span className="flex-1">Bookmarks</span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="/ama"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>
                </span>
                <span className="flex-1">AMA</span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="/stack"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                </span>
                <span className="flex-1">Stack</span>
              </a>
            </li>
            <li className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 dark:text-white text-opacity-40">
              Projects
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="https://designdetails.fm"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="flex-1">Design Details</span>
                <span className="flex items-center justify-center w-4 text-black dark:text-white text-opacity-40">
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="https://staff.design"
              >
                <span className="flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 19 20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.5624 7.65024C15.3911 4.22834 13.9853 0.299954 10.3749 0.0277404C6.02993 -0.299865 1.80395 2.3005 0.442366 6.43482C-0.933043 10.6111 1.02411 15.0339 4.57906 17.6263C8.16191 20.239 13.1943 21.056 16.602 18.2191C19.4143 15.8778 18.023 11.8653 16.7983 8.33341C16.7186 8.10345 16.6396 7.87553 16.5624 7.65024ZM12.9543 11.6429C12.9543 13.4747 11.5233 14.6404 9.06857 14.6404C7.06405 14.6404 5.90451 13.9188 5.52211 13.0491C5.42959 12.8456 5.38642 12.6359 5.38642 12.4324C5.38642 11.8032 5.86133 11.3715 6.50895 11.3715C7.00237 11.3715 7.33543 11.5257 7.68699 12.0191C7.99538 12.457 8.51347 12.6359 9.09941 12.6359C9.88271 12.6359 10.3638 12.3152 10.3638 11.8773C10.3638 11.4578 10.0184 11.279 9.01923 11.1001L8.1249 10.9398C6.35475 10.6252 5.38642 9.73087 5.38642 8.34929C5.38642 6.56064 6.92836 5.43194 9.0439 5.43194C10.8079 5.43194 12.0723 6.05488 12.5349 7.16508C12.6089 7.34395 12.6459 7.51048 12.6459 7.71401C12.6459 8.30612 12.2141 8.70702 11.5603 8.71319C11.0052 8.71319 10.6537 8.52199 10.3391 8.04707C10.0492 7.60299 9.636 7.43646 9.07474 7.43646C8.34694 7.43646 7.97688 7.75719 7.97688 8.15809C7.97688 8.55899 8.35928 8.7502 9.24743 8.91056L10.1418 9.07092C12.0538 9.41631 12.9543 10.1996 12.9543 11.6429Z"
                    ></path>
                  </svg>
                </span>
                <span className="flex-1">Staff Design</span>
                <span className="flex items-center justify-center w-4 text-black dark:text-white text-opacity-40">
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="https://figma.com/@brian"
              >
                <span className="flex items-center justify-center">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.63338 14.8C5.25222 14.8 5.84571 14.5541 6.2833 14.1166C6.72088 13.679 6.96672 13.0855 6.96672 12.4666V10.1333H4.63338C4.01454 10.1333 3.42105 10.3791 2.98347 10.8167C2.54588 11.2543 2.30005 11.8478 2.30005 12.4666C2.30005 13.0855 2.54588 13.679 2.98347 14.1166C3.42105 14.5541 4.01454 14.8 4.63338 14.8V14.8Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M2.30005 7.39998C2.30005 6.78115 2.54588 6.18765 2.98347 5.75007C3.42105 5.31248 4.01454 5.06665 4.63338 5.06665H6.96672V9.73332H4.63338C4.01454 9.73332 3.42105 9.48748 2.98347 9.0499C2.54588 8.61231 2.30005 8.01882 2.30005 7.39998V7.39998Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M2.30005 2.33333C2.30005 1.71481 2.54563 1.12159 2.98282 0.684062C3.42001 0.246529 4.01304 0.000483221 4.63156 0L6.96489 0V4.66667H4.63338C4.01454 4.66667 3.42105 4.42083 2.98347 3.98325C2.54588 3.54566 2.30005 2.95217 2.30005 2.33333V2.33333Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M7.3999 0H9.73323C10.3521 0 10.9456 0.245833 11.3832 0.683417C11.8207 1.121 12.0666 1.71449 12.0666 2.33333C12.0666 2.95217 11.8207 3.54566 11.3832 3.98325C10.9456 4.42083 10.3521 4.66667 9.73323 4.66667H7.3999V0Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M11.9667 7.4034C11.9667 8.02224 11.7209 8.61573 11.2833 9.05332C10.8457 9.4909 10.2522 9.73673 9.63338 9.73673C9.01454 9.73673 8.42105 9.4909 7.98347 9.05332C7.54588 8.61573 7.30005 8.02224 7.30005 7.4034C7.30005 6.78456 7.54588 6.19107 7.98347 5.75349C8.42105 5.3159 9.01454 5.07007 9.63338 5.07007C10.2522 5.07007 10.8457 5.3159 11.2833 5.75349C11.7209 6.19107 11.9667 6.78456 11.9667 7.4034V7.4034Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <span className="flex-1">Figma Plugins</span>
                <span className="flex items-center justify-center w-4 text-black dark:text-white text-opacity-40">
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="/security"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="flex-1">Security Checklist</span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="/hn"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="flex-1">Hacker News</span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="/app-dissection"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="flex-1">App Dissection</span>
              </a>
            </li>
            <li className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 dark:text-white text-opacity-40">
              Online
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="https://twitter.com/brian_lovin"
              >
                <span className="flex items-center justify-center">
                  <svg
                    viewBox="0 0 16 14"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="currentColor"
                  >
                    <path d="M14.3617 3.35401C14.3687 3.49999 14.3713 3.64777 14.3713 3.79376C14.3713 8.29039 11.0696 13.4737 5.03217 13.4737C3.17739 13.4737 1.45304 12.9105 0 11.9445C0.859457 12.0522 1.73097 11.9833 2.56473 11.7418C3.39849 11.5003 4.17814 11.0908 4.85913 10.5369C4.17428 10.5235 3.51059 10.2886 2.96085 9.86516C2.41112 9.44169 2.00282 8.85078 1.79304 8.17505C2.28527 8.27044 2.79186 8.25042 3.27565 8.11647C2.53271 7.96035 1.8647 7.54285 1.38482 6.9347C0.904951 6.32655 0.642734 5.56518 0.642609 4.77959V4.73724C1.09843 5.00001 1.60823 5.14614 2.12957 5.16347C1.4338 4.6828 0.941284 3.94507 0.752536 3.10088C0.563788 2.25669 0.693041 1.36968 1.11391 0.620882C1.93808 1.67201 2.96639 2.53173 4.13207 3.14418C5.29774 3.75663 6.5747 4.10813 7.88 4.17584C7.82353 3.92137 7.79523 3.66107 7.79565 3.39996C7.79565 2.9534 7.88054 2.51121 8.04548 2.09865C8.21041 1.68609 8.45215 1.31124 8.7569 0.995511C9.06165 0.679784 9.42344 0.429363 9.82159 0.258552C10.2197 0.0877414 10.6465 -0.00011384 11.0774 4.51813e-06C11.5265 -0.000754465 11.9709 0.0941183 12.3832 0.278738C12.7954 0.463357 13.1667 0.733786 13.4739 1.07325C14.2088 0.922489 14.9136 0.643368 15.5583 0.247815C15.3131 1.03559 14.8001 1.70424 14.1148 2.12937C14.7654 2.04944 15.4009 1.86901 16 1.5941C15.5599 2.27755 15.005 2.87363 14.3617 3.35401V3.35401Z"></path>
                  </svg>
                </span>
                <span className="flex-1">Twitter</span>
                <span className="flex items-center justify-center w-4 text-black dark:text-white text-opacity-40">
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  text-gray-700 dark:text-gray-200 sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200"
                href="https://github.com/brianlovin"
              >
                <span className="flex items-center justify-center">
                  <svg
                    viewBox="0 0 17 16"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.06478 0C3.61133 0 0 3.6722 0 8.20248C0 11.8266 2.31081 14.9013 5.51518 15.9859C5.91823 16.0618 6.06622 15.808 6.06622 15.5913C6.06622 15.3957 6.05875 14.7496 6.05528 14.0642C3.81164 14.5604 3.3382 13.0963 3.3382 13.0963C2.97134 12.1483 2.44275 11.8961 2.44275 11.8961C1.71103 11.387 2.49791 11.3975 2.49791 11.3975C3.30775 11.4552 3.73417 12.2428 3.73417 12.2428C4.45347 13.4968 5.62083 13.1343 6.08103 12.9247C6.15342 12.3947 6.36245 12.0325 6.59305 11.8278C4.80178 11.6204 2.91872 10.9171 2.91872 7.77405C2.91872 6.87851 3.23377 6.14679 3.74966 5.57235C3.66593 5.36561 3.38987 4.53148 3.8278 3.40163C3.8278 3.40163 4.50501 3.18118 6.04619 4.24243C6.68951 4.0607 7.37942 3.96953 8.06478 3.96644C8.75018 3.96953 9.44062 4.0607 10.0851 4.24243C11.6244 3.18118 12.3007 3.40163 12.3007 3.40163C12.7397 4.53148 12.4635 5.36561 12.3798 5.57235C12.8969 6.14679 13.2098 6.87851 13.2098 7.77405C13.2098 10.9245 11.3231 11.6182 9.52728 11.8213C9.81657 12.0758 10.0743 12.575 10.0743 13.3403C10.0743 14.4377 10.065 15.321 10.065 15.5913C10.065 15.8096 10.2101 16.0653 10.6189 15.9848C13.8216 14.899 16.1294 11.8254 16.1294 8.20248C16.1294 3.6722 12.5187 0 8.06478 0Z"
                    ></path>
                  </svg>
                </span>
                <span className="flex-1">GitHub</span>
                <span className="flex items-center justify-center w-4 text-black dark:text-white text-opacity-40">
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
          </ul>
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
        </nav>
        <div className="fixed bg-black bg-opacity-5 dark:bg-opacity-50 transition duration-200 ease-in-out inset-0 z-20 opacity-0 pointer-events-none">
          <div className="flex flex-1">
            <div className="flex w-full">
              <div className="relative flex flex-col w-full max-h-screen overflow-y-auto bg-white dark:bg-black">
                <div
                  className="sticky top-0 z-10 flex justify-center flex-col px-3 py-2 dark:bg-gray-900 dark:bg-opacity-80 bg-white bg-opacity-90 filter-blur dark:border-b dark:border-gray-900"
                  style={{
                    boxShadow: "rgba(0,0,0, 0.12) 0 1px 3px",
                    minHeight: 48,
                  }}
                >
                  <div className="flex items-center justify-between flex-none">
                    <span className="flex items-center space-x-3">
                      <span className="flex items-center justify-center p-2 rounded-md cursor-pointer lg:hidden hover:bg-gray-200 dark:hover:bg-gray-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="text-primary"
                        >
                          <line x1="3" y1="12" x2="21" y2="12"></line>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                      </span>
                      <p
                        className="text-sm font-bold transform-gpu text-primary line-clamp-1"
                        style={{ transform: "translateY(0)", opacity: 0 }}
                      >
                        Home
                      </p>
                    </span>
                  </div>
                  <div></div>
                </div>
                <main
                  id="skip"
                  className="w-full max-w-3xl px-4 py-8 pb-10 mx-auto md:px-8"
                >
                  {children}
                  <Footer />
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
