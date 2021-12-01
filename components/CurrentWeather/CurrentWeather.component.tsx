import styles from "./CurrentWeather.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export default function CurrentWeather({ city, countryCode, timezone }) {
  const [weather, setWeather] = useState(null);
  const [err, setErr] = useState(null);

  const [useFahrenheit, setUseFahrenheit] = useState(true);

  const fetchWeather = async () => {
    fetch(`/api/weather?city=${city}&country_code=${countryCode}`)
      .then((res) => res.json())
      .then((data) => {
        let timestamp = new Date().getTime();
        let zonedTimestamp = utcToZonedTime(timestamp, timezone);

        console.log("fresh weather data", data);
        console.log("The weather data has been updated!");
        console.log(
          `Current Temperature in ${city}, ${countryCode} as of ${format(
            timestamp,
            "eee "
          )} is:
          ${Math.round(data.temp)}°C / ${Math.round(data.temp_f)}°F`
        );
        const weatherObj = {
          ...data,
          timestamp,
        };
        window.localStorage.setItem("weather", JSON.stringify(weatherObj));
        setWeather(data);
        setErr(null);
      })
      .catch((error) => {
        console.error(err);

        setWeather(null);
        setErr(err);
      });
  };

  const handleUseFahrenheit = () => {
    setUseFahrenheit(!useFahrenheit);
    window.localStorage.setItem("useFahrenheit", `${!useFahrenheit}`);
  };

  useEffect(() => {
    const currentTime = new Date().getTime();
    const weatherStore = window.localStorage.getItem("weather");

    // set fahrenheit preference in local state
    const fahrenheitLSString = window.localStorage.getItem("useFahrenheit");
    if (fahrenheitLSString === "false") {
      setUseFahrenheit(false);
    }

    if (weatherStore) {
      const weatherParsed = JSON.parse(weatherStore);
      // check timestamp if it's been 15 minutes
      if (
        currentTime - weatherParsed.timestamp > 1000000 ||
        weatherParsed.timestamp == NaN
      ) {
        // if it has then refetch
        console.log("fetching weather...");
        fetchWeather();
      } else {
        setWeather(weatherParsed);
      }
    } else {
      fetchWeather();
    }
  }, []);

  if (err) return (
    <p className="capsize text-gray-800 dark:text-gray-200 font-medium">
      Weather 404 :(
    </p>
  );
  if (!weather)
    return (
      <p className="capsize text-gray-800 dark:text-gray-200 font-medium">
        Loading Weather...
      </p>
    );

  return (
    <div
      className="flex flex-row items-center cursor-pointer"
      onClick={handleUseFahrenheit}
    >
      <span>
        {/* @ts-ignore */}
        {Math.round(useFahrenheit ? weather.temp_f : weather.temp)}
        {`°${useFahrenheit ? "F" : "C"} `}
      </span>
      {/* @ts-ignore */}
      <Image
        alt={weather.description}
        width={50}
        height={50}
        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
      />
    </div>
  );
}
