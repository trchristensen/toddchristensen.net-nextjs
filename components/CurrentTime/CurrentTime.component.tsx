const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");

const CurrentTime = ({ timezone, city, countryCode }) => {

    const date = new Date();
    const zonedDate = utcToZonedTime(date, timezone);

  return (
    <div className="text-accent flex flex-wrap">
      <span className="mr-2 font-semibold text-base-content">
        {format(zonedDate, "eee ")}
        {format(zonedDate, "p")}
      </span>
      <span className="text-accent"> @ {city}, {countryCode}</span>
    </div>
  );
};

export default CurrentTime;
