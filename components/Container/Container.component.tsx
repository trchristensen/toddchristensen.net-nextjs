import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import cn from "classnames";
import Footer from "components/Footer/Footer.component";
import MobileMenu from "components/MobileMenu/MobileMenu.component";
import { site } from "config/site.config";
import { FaRocket } from "react-icons/fa";
import { MdPartyMode } from "react-icons/md";
import { BiCake, BiMoon, BiSun } from "react-icons/bi";
import { SiAtom } from "react-icons/si";
import ChangeTheme from "components/ChangeTheme/ChangeTheme.component";
import useSound from "use-sound";
import { Volume2, VolumeX } from 'react-feather'
import { useSoundContext } from "components/Providers/Index";




function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;
  const { playClick } = useSoundContext();
    

  return (
    <NextLink href={href}>
      <a
        onClick={() => playClick()}
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
  const { toggleSound, soundEnabled } = useSoundContext();
  const [playActive] = useSound("/sounds/start.mp3", { volume: 0.25 });

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
    // <div className="bg-gray-50 dark:bg-gray-900">
    <div>
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
      <div className="flex flex-col justify-center px-4">
        <nav className="flex items-center justify-between w-full relative max-w-2xl mx-auto pt-8 pb-8 sm:pb-16">
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
          <div className="ml-[-0.60rem]">
            <MobileMenu />
            {site.mainMenu.map((navItem, idx) => (
              <NavItem key={idx} href={navItem.path} text={navItem.title} />
            ))}
          </div>
          {soundEnabled ? (
            <Volume2 className="cursor-pointer" onClick={() => toggleSound()} />
          ) : (
            <VolumeX className="cursor-pointer" onClick={() => toggleSound()} />
          )}

          <ChangeTheme />
        </nav>
      </div>
      <main id="skip" className="flex flex-col justify-center px-4">
        {children}
        <Footer />
      </main>
    </div>
  );
}
