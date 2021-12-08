const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");

const CurrentTime = ({ timezone, city, countryCode, className }) => {

    const date = new Date();
    const zonedDate = utcToZonedTime(date, timezone);

  return (
    <div
      className={`flex flex-wrap text-base-content ${className}`}
    >
      <span className="mr-2 font-semibold">
        {format(zonedDate, "eee ")}
        {format(zonedDate, "p")}
      </span>
      <span>
        {" "}
        @ {city}, {countryCode}
      </span>
    </div>
  );
};

export default CurrentTime;
