const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");

const CurrentTime = () => {

    const date = new Date();
    const timeZone = "Asia/Manila";
    const zonedDate = utcToZonedTime(date, timeZone);

  return (
    <article>
      <span>
        {format(zonedDate, "eee ")}
        {format(zonedDate, "p")}
      </span>
      <span> @ Angeles City, PH</span>
    </article>
  );
};

export default CurrentTime;
