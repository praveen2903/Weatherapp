import React, { useEffect, useRef, useState } from 'react'
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai';

function TopButtons({ setCity, top }) {
    const [toggle,setToggle]=useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        // Function to handle click outside menu
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setToggle(false);
        }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component is unmounted
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        setToggle(!toggle)
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
                    return(
                        <button 
                            key={city.id} 
                            className={`text-lg font-medium ${top}`}
                            onClick={() => handleCityClick(city.title)} 
                        >
                            {city.title}
                        </button>
                    )
                })}
            </div>
            <div className='relative md:hidden' ref={menuRef}  style={{ position: 'fixed', top: '0', right: '0', maxHeight: '300px', overflowY: 'auto', background: '#000' }}>
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
                    <div className={`duration-300 p-8 md:hidden font-serif left-[50%] right-0 fit-content fixed overflow bg-[#fbbf24] cursor-pointer rounded-lg ${toggle ? 'left-[0]': 'left-[-100%]'}`}>
                        {cities.map((city) => (
                            <button
                                key={city.id}
                                className='text-[#1d4ed8] hover:text-[#22d3ee] text-lg font-light block py-2'
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