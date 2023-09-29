import React from 'react'

export default function Time({weather, timecolor}) {
    const dateTime = new Date(weather.dt * 1000);
    const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
    const currentLocalTime = toUtc + 1000 * weather.timezone;
    const selectedDate = new Date(currentLocalTime);
    const date = selectedDate.toLocaleString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const time = selectedDate.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  return (
    <div>
        <div className="flex items-center justify-center my-6">
            <p className={`text-[15px] sm:text-3xl font-semibold ${timecolor}`}>
              {date} ,{time}{" "}
            </p>
      </div>

    </div>
  )
}
