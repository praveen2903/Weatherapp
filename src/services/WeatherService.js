 import { DateTime } from "luxon";

const API_KEY = "90475ff9d831a9f35e4705532f78fbcb";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((data) => data);

    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country,sunrise,sunset},
      dt,
      timezone,
      name,
    } = data;

    const { description, icon } = weather[0];

    return {
      description,
      iconURL: makeIconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      sunrise,
      sunset,
      dt,
      timezone,
      humidity,
      speed,
      country,
      name,
    };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export { getFormattedWeatherData };
export {formatToLocalTime}

