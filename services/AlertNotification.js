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
      console.log("ici");
      console.log(preferencesDoc.data());
      return preferencesDoc.data().preferences;
    } else {
      console.log("pb");
      return null;
    }
  } catch (error) {
    console.error('Error getting alert preferences:', error);
    throw error;
  }
};

const checkAlertThresholds = async (userId, weatherData) => {
  try {
    console.log("Checking alert thresholds...");

    const preferences = await getAlertPreferences(userId);
    console.log("User preferences:", preferences);

    if (preferences) {
      for (const data of weatherData) {
        const cityName = data.city.nom;
        Object.entries(preferences).forEach(([thresholdName, thresholdValue]) => {
          console.log(`Checking thresholds for ${cityName}...`);
          console.log(thresholdName + " = " + thresholdValue);
          console.log("ici="+data.weatherData);
          console.log("test : " + getWeatherValue(data.weatherData, thresholdName))
          console.log("weather data = " + data.weatherData);
          if (data.weatherData) {
            if (thresholdName === 'coldThreshold') {
              if (getWeatherValue(data.weatherData, 'coldThreshold') < thresholdValue) {
                console.log(`Alert Cold! Threshold reached for ${thresholdName}: ${thresholdValue} in ${cityName}`);  
                alert(`Alert Cold! Threshold reached for ${thresholdName}: ${thresholdValue} in ${cityName}`);
              }
            } else if(getWeatherValue(data.weatherData, thresholdName) >= thresholdValue) {
              console.log(`Alert! Threshold reached for ${thresholdName}: ${thresholdValue} in ${cityName}`);
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