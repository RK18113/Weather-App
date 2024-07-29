import React, { useState, useEffect } from 'react';

function WeatherBoard() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const key = 'db635712e9667e034baa107ae8e1dabc';

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  async function fetchWeatherData() {
    const locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`);
    const locationData = await locationResponse.json();

    if (locationData.length > 0) {
      const { lat, lon } = locationData[0];
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
      const weatherData = await weatherResponse.json();

      setWeatherData(weatherData);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityInput = e.target.elements.cityInput.value;
    setCity(cityInput);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen bg-[#5B84B1FF]'>
      <form onSubmit={handleSubmit} className='mb-4'>
        <input
          type="text"
          name="cityInput"
          placeholder="Enter city name"
          className='p-2 border rounded'
        />
        <button type="submit" className='ml-2 p-2 bg-[#5B8BFF] text-white rounded'>Search</button>
      </form>

      {weatherData && (
        <div className='h-[600px] w-[600px] bg-[#5B8BFF] rounded-3xl flex flex-col items-center justify-center'>
          <img 
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={weatherData.weather[0].description} 
          />
          <p className='text-white text-5xl'>{weatherData.weather[0].description}</p>
          <p className='text-white text-3xl mt-4'>{weatherData.name}</p>
          <p className='text-white text-2xl'>
            {Math.round(weatherData.main.temp - 273.15)}°C
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherBoard;