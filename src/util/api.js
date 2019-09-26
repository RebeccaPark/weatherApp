const WEATHER_MAP_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '3dea5b414414c398e9124083d15c6ca2';

const BASE_URL= `${WEATHER_MAP_URL}?APPID=${API_KEY}`;


export const getWeatherByCity = async (cityName) => { 
  const response = await fetch(`${BASE_URL}&q=${cityName}`);
  const data = await response.json();
  return data.main;
};

export const getWeatherByCoordinates = async (latitude, longitude) => {
  const response = await fetch(`${BASE_URL}&lat=${latitude}&lon=${longitude}`);
  const data = await response.json();
  return data.main;
}