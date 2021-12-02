import CurrentTime from "components/CurrentTime/CurrentTime.component";
import CurrentWeather from "components/CurrentWeather/CurrentWeather.component";
import NowPlaying from "components/Spotify/NowPlaying.component";
import Link from "next/link";
import { locale } from "config/locale.config";
import { site } from "config/site.config";
const { TIMEZONE, CURRENT_CITY, CURRENT_COUNTRY_CODE } = locale;

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full pb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <NowPlaying />
      <div className="w-full max-w-2xl grid grid-cols-1 grid-rows-1 gap-4 pb-16 sm:grid-flow-col sm:grid-cols-3 sm:grid-rows-3">
        {site.footerMenu.map((link, idx) => {
          idx++;
          return link.external_link ? (
            <ExternalLink key={idx} href={link.path}>
              {link.title}
            </ExternalLink>
          ) : (
            <Link key={idx} href={link.path}>
              <a className="text-gray-500 hover:text-gray-600 transition">
                {link.title}
              </a>
            </Link>
          );
        })}
      </div>
      <LocaleBar />
    </footer>
  );
}

const LocaleBar = () => (
  <div
    id="Footer__lower"
    className="text-gray-500 w-full flex flex-wrap flex-col-reverse items-start sm:items-center sm:justify-between sm:flex-row"
  >
    <CurrentTime
      timezone={TIMEZONE}
      city={CURRENT_CITY}
      countryCode={CURRENT_COUNTRY_CODE}
    />
    <CurrentWeather
      city={CURRENT_CITY}
      countryCode={CURRENT_COUNTRY_CODE}
      timezone={TIMEZONE}
    />
  </div>
);
