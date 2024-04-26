import { doc, getDoc, setDoc } from "firebase/firestore";
import {db} from "./firebase";

const storeAlertPreferences = async (userId, preferences) => {
  try {
    console.log(userId);
    await setDoc(doc(db, "alertPreference", userId), {
      preferences,
    });
  } catch (error) {
    console.error('Error storing alert preferences:', error);
    throw error;
  }
};

const getAlertPreferences = async (userId) => {
  try {
    const preferencesDoc = await getDoc(doc(db, 'alertPreference', userId));
    if (preferencesDoc.exists()) {
      console.log(preferencesDoc.data());
      return preferencesDoc.data().preferences;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting alert preferences:', error);
    throw error;
  }
};

const checkAlertThresholds = async (userId, weatherData) => {
  try {
    const preferences = await getAlertPreferences(userId);

    if (preferences) {
      for (const data of weatherData) {
        const cityName = data.city.name;
        Object.entries(preferences).forEach(([thresholdName, thresholdValue]) => {
          if (data.weatherData) {
            if (thresholdName === 'coldThreshold') {
              if (getWeatherValue(data.weatherData, 'coldThreshold') < thresholdValue) {
                alert(`Alert Cold! Threshold reached for ${thresholdName}: ${thresholdValue} Degree in ${cityName}`);
              }
            } else if(getWeatherValue(data.weatherData, thresholdName) >= thresholdValue) {
              alert(`Alert! Threshold reached for ${thresholdName}: ${thresholdValue} in ${cityName}`);
            }
          }
        });
      }
    } else {
      console.log("No alert preferences found for the user.");
    }
  } catch (error) {
    console.error('Error checking alert thresholds:', error);
    throw error;
  }
};


const getWeatherValue = (weatherData, thresholdName) => {
  switch (thresholdName) {
      case 'windThreshold':
          return weatherData.wind.speed;
      case 'rainThreshold':
          return weatherData.rain ? weatherData.rain['1h'] : 0;
      case 'heatThreshold':
          return weatherData.main.temp_max; 
      case 'coldThreshold':
          return weatherData.main.temp_min; 
      default:
          return null;
  }
};

export {storeAlertPreferences, getAlertPreferences, checkAlertThresholds};