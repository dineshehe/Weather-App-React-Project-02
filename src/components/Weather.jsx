import React, { useEffect, useRef, useState } from 'react'
import "./weather.css"
import search_icon from '../assets/Assets/search.png'
import cloud_icon from '../assets/Assets/cloud.png'
import clear_icon from '../assets/Assets/clear.png'
import drizzle_icon from '../assets/Assets/drizzle.png'
import rain_icon from '../assets/Assets/rain.png'
import snow_icon from '../assets/Assets/snow.png'
import wind_icon from '../assets/Assets/wind.png'
import humidity_icon from '../assets/Assets/humidity.png'

const Weather = () => {
  const inputRef = useRef()
  const [dataa, setDataa] = useState({})
  const [error, setError] = useState("")

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const search = async (city) => {
    setError("") // reset error

    if (!city.trim()) {
      alert("Please enter a city name")
      clearInput()
      return
    }

 

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok || !data.weather) {
        alert(`DO you think${city} is a right spelling?`)
        clearInput()
        return
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon
      setDataa({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

      clearInput() // result show hone ke baad input empty
    } catch (error) {
      setError("Could not fetch the data")
      clearInput()
    }
  }

  useEffect(() => {
    search("Manesar")
  }, [])

  return (
    <div className='weather'>
      <div className='searchbar'>
        <input
          ref={inputRef}
          type="text"
          placeholder='Search'
          onKeyDown={(e) => e.key === "Enter" && search(inputRef.current.value)}
        />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {dataa.icon && (
        <>
          <img className='w-[150px] m-[30px]' src={dataa.icon} alt="" />
          <p className='text-[#fff] text-[80px] leading-25'>{dataa.temperature}°c</p>
          <p className='text-amber-100 text-[20px]'>{dataa.location}</p>
          <br />

          <div className='w-[100%] text-amber-50 flex justify-between'>
            <div>
              <img src={humidity_icon} alt="" />
              <div>
                <br />
                <span>Humidity</span> <p>{dataa.humidity}%</p>
              </div>
            </div>

            <div>
              <img src={wind_icon} alt="" />
              <div>
                <br />
                <span>Wind Speed</span> <p>{dataa.windspeed}km/h</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather
