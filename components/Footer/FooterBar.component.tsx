import CurrentTime from "components/CurrentTime/CurrentTime.component";
import CurrentWeather from "components/CurrentWeather/CurrentWeather.component";
import { locale } from "config/locale.config";

export default function FooterBar() {
  return (
    <div
      id="Footer__lower"
      className="w-full flex flex-wrap items-center justify-between rounded shadow-md p-1 min-h-[50px]"
    >
      <div className="w-full rounded flex flex-wrap items-center justify-between px-3">
        <CurrentTime
          city={locale.CURRENT_CITY}
          countryCode={locale.CURRENT_COUNTRY_CODE}
          timezone={locale.TIMEZONE}
        />
        <CurrentWeather
          city={locale.CURRENT_CITY}
          countryCode={locale.CURRENT_COUNTRY_CODE}
          timezone={locale.TIMEZONE}
        />
      </div>
    </div>
  );
}
