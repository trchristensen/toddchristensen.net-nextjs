const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");

const CurrentTime = ({ timezone, city, countryCode }) => {

    const date = new Date();
    const zonedDate = utcToZonedTime(date, timezone);

  return (
    <div className="flex flex-wrap">
      <span>
        {format(zonedDate, "eee ")}
        {format(zonedDate, "p")}
      </span>
      <span> @ {city}, {countryCode}</span>
    </div>
  );
};

export default CurrentTime;
