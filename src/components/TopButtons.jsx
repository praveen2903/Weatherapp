import React, { useState } from 'react'
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai';

function TopButtons({ setCity, weather, units }) {
    const [toggle,setToggle]=useState(false);
    const temp=weather.temp;
 
    const cities = [
        {
            id:1,
            title: 'London'
        },
        {
            id : 2,
            title: 'Sydney'
        },
        {
            id:3,
            title: 'Tokyo'
        },
        {
            id:4,
            title: 'New York'
        },
        {
            id:5,
            title: 'Paris'
        },
        {
            id:6,
            title:'Hyderabad'
        },
    ];

    const handleCityClick = (city) => {
        setCity(city);
    };


    return (
        <div className='flex items-center justify-around my-6'>
            <div>
                <h1 className='md:text-4xl font-bold uppercase text-xl text-[#eab308]'>
                    WeatherInfo
                </h1>
            </div>
            <div className='hidden md:flex items-center justify-around gap-20'>
                {cities.map((city) => {
                    const threshold = units === "metric" ? 20 : 68;
                    const temperature = parseFloat(temp);
            
                    let temperatureClass = "";
                    if (temperature < threshold) {
                      temperatureClass = "text-black";     // Change to blue if temperature is less than 20
                    } else if (temperature >= threshold) {
                      temperatureClass = "text-white";      // Change to red if temperature is 20 or more
                    }
                    return(
                        <button 
                            key={city.id} 
                            className={`text-lg font-medium ${temperatureClass}`}
                            onClick={() => handleCityClick(city.title)} 
                        >
                            {city.title}
                        </button>
                    )
                })}
            </div>
            <div className='relative md:hidden'>
                <button
                    onClick={() => setToggle(!toggle)}
                    className='text-white text-2xl md:hidden block'
                >
                    {
                        toggle ?
                            <AiOutlineClose onClick={()=>setToggle(!toggle)} className='text-white text-2xl md:hidden block'/>
                            :
                            <AiOutlineMenu onClick={()=>setToggle(!toggle)} className='text-white text-2xl md:hidden block'/>
                    }
                </button>

                {toggle && (
                    <div className={`duration-300 md:hidden w-full h-screen text-white fixed bg-black top-[92px] ${toggle ? 'left-[0]': 'left-[-100%]'}`}>
                        {cities.map((city) => (
                            <button
                                key={city.id}
                                className='text-white text-lg font-medium block py-2'
                                onClick={() => handleCityClick(city.title)}
                            >
                                {city.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default TopButtons;