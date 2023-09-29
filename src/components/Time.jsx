import React, { useEffect, useState } from 'react';

export default function Time({ weather, timecolor }) {
  const [mytime, setMyTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const selectedDate = new Date(Date.now() + weather.timezone * 1000 - 5.5 * 60 * 60 * 1000);

      const time = selectedDate.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setMyTime(time);
      requestAnimationFrame(updateClock);
    };

    const interval = requestAnimationFrame(updateClock);

    return () => {
      cancelAnimationFrame(interval);
    };
  }, [weather.timezone]);

  const date = new Date().toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className={`text-[15px] sm:text-3xl font-semibold ${timecolor}`}>
          {date} ,{mytime}
        </p>
      </div>
    </div>
  );
}
