const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '3dea5b414414c398e9124083d15c6ca2';

export const getRequest = async () => { 
  const response = await fetch(`${BASE_URL}?q=London&APPID=${API_KEY}`);
  const data = await response.json();
  console.log(data);
};

console.log(getRequest());