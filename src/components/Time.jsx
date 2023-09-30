import React, { useEffect, useState } from 'react';

export default function Time({ weather }) {
  const [mytime, setMyTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const selectedDate = new Date(Date.now() + weather.timezone * 1000 - 5.5 * 60 * 60 * 1000);

      let hours = selectedDate.getHours();
      let minutes = selectedDate.getMinutes();
      let seconds = selectedDate.getSeconds();
      let format = hours >= 12 ? 'PM' : 'AM';

      // Format hours
      if (hours === 0) {
        hours = 12;
      } else if (hours > 12) {
        hours -= 12;
      }

      // Add leading zeros to minutes and seconds
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      const time = `${hours}:${minutes}:${seconds} ${format}`;

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
        <p className="text-[15px] sm:text-3xl font-semibold text-[#0a0a0a] bg-transparent">
          {date} ,{mytime}
        </p>
      </div>
    </div>
  );
}
