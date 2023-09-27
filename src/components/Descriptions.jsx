import React from "react";
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { formatToLocalTime } from "../services/WeatherService";

const Descriptions = ({ weather, units, card}) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
    {
      id: 7,
      icon: <BsFillSunriseFill/>,
      title: "sunrise",
      data: formatToLocalTime(weather.sunrise,weather.timezone,'hh:mm'),
      unit: ' AM',
    },
    {
      id: 8,
      icon: <BsFillSunsetFill/>,
      title: "sunset",
      data: formatToLocalTime(weather.sunset,weather.timezone,'hh:mm'),
      unit: ' PM',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 ">
      {cards.map(({ id, icon, title, data, unit }) => {
        return (
            <div
              key={id}
              className={`p-4 rounded-lg shadow text-center ${card}`}
            >
              <div className="flex flex-col items-center justify-between">
                <div className="text-2xl">{`${data} ${unit}`}</div>
                <div className="mt-2 text-white">{title}</div>
                <div className="mt-2">{icon}</div>
              </div>
            </div>
          
        );
      })}
    </div>
  );
};

export default Descriptions;
