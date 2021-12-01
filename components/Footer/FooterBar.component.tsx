import CurrentTime from "components/CurrentTime/CurrentTime.component";
import CurrentWeather from "components/CurrentWeather/CurrentWeather.component";

export default function FooterBar() {
  return (
    <div
      id="Footer__lower"
      className="text-gray-700 dark:text-gray-300 w-full flex flex-wrap items-center justify-between rounded shadow-md p-1 min-h-[50px] bg-radial from-sky-200 via-sky-300 to-sky-400 dark:from-indigo-700 dark:via-indigo-800 dark:to-indigo-900"
    >
      <div className="bg-white dark:bg-black w-full rounded bg-opacity-80 dark:bg-opacity-20 flex flex-wrap items-center justify-between px-3">
        <CurrentTime />
        <CurrentWeather />
      </div>
    </div>
  );
}
