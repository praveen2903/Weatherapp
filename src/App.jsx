import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./services/WeatherService";
import TopButtons from "./components/TopButtons";
import './App.css'
import Time from "./components/Time";

function App() {
  const [city, setCity] = useState("Guntur");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);
  const [color,setColor]=useState("text-black");
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [card,setCard]=useState("bg-red-500");
  const [top,setTop]=useState("text-white");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);

        // dynamic bg
        const threshold = units === "metric" ? 20 : 68;
        if (data.temp <= threshold){
          setBg(coldBg);
          setColor("text-white");
          setCard("bg-blue-500");
          setTop("text-black")
          
        } 
        else {
          setBg(hotBg);
          setColor("text-black")
          setCard("bg-red-500")
          setTop("text-white")
  
        }

        // Reset search not found if data is found
        setSearchNotFound(false);
      } catch (error) {
        setSearchNotFound(true);
      }
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  };

  const enterKeyPressed = (e) => {
    if (e.key === "Enter") {
      setCity(e.target.value);
      e.target.blur();
    }
  };

  return (
      <div
        className="app relative bg-cover bg-center min-h-[300vh] md:min-h-[120vh] w-full"
        style={{
          backgroundImage: `url(${bg})`,

        }}
      >
        <div className="overlay bg-opacity-50 absolute inset-0">
          {searchNotFound ? (
            <div className="container mx-auto p-4 text-center">
              <h1 className="text-2xl font-bold">Search not found, Refresh page to continue</h1>
            </div>
          ) : weather ? (
            <div className="container mx-auto p-4">
              <TopButtons setCity={setCity} top={top} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <input
                  onKeyDown={enterKeyPressed}
                  type="search"
                  name="city"
                  setCity={setCity}
                  placeholder="Enter City..."
                  className="p-2 font-semibold rounded-full border border-gray-300 focus:outline-none capitalize text-blue-dark bg-[#d9f99d]"
                />
                <button
                  onClick={handleUnitsClick}
                  className="p-2 rounded-full bg-blue-500 text-white focus:outline-none hover:bg-blue-600"
                >
                  {units === "metric" ? "°F" : "°C"}
                </button>
              </div>

              <div className="mt-8 text-center">
                <h3 className={`text-2xl font-semibold ${color}`}>
                  {`${weather.name}, ${weather.country}`}
                </h3>
                <img
                  src={weather.iconURL}
                  alt="weatherIcon"
                  className="mx-auto mt-2"
                />
                <h3 className={`text-xl font-bold ${color}`}>{weather.description}</h3>
              </div>

              <Time weather={weather} color={color}/>

              <div className="mt-8 text-center">
                <h1 className={`text-5xl ${color}`}>
                  {`${weather.temp.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}
                </h1>
              </div>

              <div className="mt-8">
                <Descriptions weather={weather} units={units} card={card} />
              </div>
            </div>
          ) : (
            <div className="container mx-auto p-4 text-center">
              <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
          )}
        </div>
      </div>
      
  );
}

export default App;
