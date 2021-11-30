import styles from "./CurrentWeather.module.css";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FcBrokenLink } from "react-icons/fc";


export default function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [err, setErr] = useState(null);

  const [useFahrenheit, setUseFahrenheit] = useState(true);

  const fetchWeather = async () => {
    fetch("/api/weather?city=Angeles City&country_code=PH")
      .then((res) => res.json())
      .then((data) => {
        console.log("fresh weather data", data);
        const weatherObj = {
          ...data,
          timestamp: new Date().getTime(),
        };
        console.log('weatherObj', weatherObj)
        window.localStorage.setItem(
          "weather",
          JSON.stringify(weatherObj)
        );
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

    // set fahrenheit pref in state
    const fahrenheitLSString = window.localStorage.getItem("useFahrenheit");
    if (fahrenheitLSString === "false") {
      setUseFahrenheit(false);
    }

    if (weatherStore) {
      const weatherParsed = JSON.parse(weatherStore);
      console.log("found weather in local storage.", weatherParsed);
      // check timestamp if it's been 15 minutes
      console.log(
        "seconds until weather refetch",
        Math.round((1000000 - (currentTime - weatherParsed.timestamp)) / 1000)
      );
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

  if (err) return <FcBrokenLink />;
  if (!weather) return <LoadingSpinner />;

  // return <>{JSON.stringify(data)}</>;
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
        width={50}
        height={50}
        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
      />
    </div>
  );
}

// icons from https://codepen.io/joshbader/pen/EjXgqr?editors=1100

const RainyIcon = ({ fontSize = "sm" }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <div className={styles.cloud}></div>
        <div className={styles.rain}></div>
      </div>
    </div>
  );
};

const SunnyIcon = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <div className={styles.sun}>
          <div className={styles.rays}></div>
        </div>
      </div>
    </div>
  );
};

const FlurriesIcon = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <div className={styles.cloud}></div>
        <div className={styles.snow}>
          <div className={styles.flake}></div>
          <div className={styles.flake}></div>
        </div>
      </div>
    </div>
  );
};

const CloudyIcon = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <div className={styles.cloud}></div>
        <div className={styles.cloud}></div>
      </div>
    </div>
  );
};

const ThunderStormIcon = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <div className={styles.cloud}></div>
        <div className={styles.lightning}>
          <div className={styles.bolt}></div>
          <div className={styles.bolt}></div>
        </div>
      </div>
    </div>
  );
};

const SunShowerIcon = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <div className={styles.cloud}></div>
        <div className={styles.sun}>
          <div className={styles.rays}></div>
        </div>
        <div className={styles.rain}></div>
      </div>
    </div>
  );
};
