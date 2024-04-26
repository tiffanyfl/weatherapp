import { useState, useEffect, useRef } from 'react';
import { getFavoriteCity } from '../services/FavoriteCities';
import { getCityWeather } from "../api/openWeather";
import { checkAlertThresholds } from '../services/AlertNotification';

const alertFromFavorite = (userId) => {
  const [meteoData, setMeteoData] = useState(null);
  const prevMeteoDataRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteCities = await getFavoriteCity(userId);
        const weatherDataArray = [];

        if (favoriteCities && favoriteCities.length > 0) { 
          for (const city of favoriteCities) {
            const weatherData = await getCityWeather(city.lat, city.lon);
            weatherDataArray.push({ city, weatherData });
          }
  
          setMeteoData(weatherDataArray);

        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (meteoData && JSON.stringify(meteoData) !== JSON.stringify(prevMeteoDataRef.current)) {
      checkAlertThresholds(userId, meteoData);
      prevMeteoDataRef.current = meteoData;
    }
  }, [userId, meteoData]);

  return meteoData;
};

export default alertFromFavorite;
