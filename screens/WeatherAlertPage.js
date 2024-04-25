import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCityWeather } from "../api/openWeather";
import { storeAlertPreferences, getAlertPreferences, checkAlertThresholds } from '../services/AlertNotification'; 
import { auth } from '../services/firebase';
import { getFavoriteCity } from '../services/FavoriteCities';


const WeatherAlertSettings = () => {
  const userId = auth.currentUser.uid;

  const [windAlert, setWindAlert] = useState(null);
  const [rainAlert, setRainAlert] = useState(null);
  const [heatAlert, setHeatAlert] = useState(null);
  const [coldAlert, setColdAlert] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState('');
  const [meteoData, setMeteoData] = useState(null);

  const alerts = [
    {
      name: 'Alerte Typhon (km/h)',
      value: windAlert,
      info: 'Risque de typhon à partir de 250km/h',
      setter: setWindAlert,
    },
    {
      name: 'Alerte Pluie Diluvienne (mm/h)',
      value: rainAlert,
      info: 'Risque de pluie diluvienne à partir de 5 mm/h',
      setter: setRainAlert,
    },
    {
      name: 'Alerte Canicule (°C)',
      value: heatAlert,
      info: 'Risque de canicule à partir de 40°C',
      setter: setHeatAlert,
    },
    {
      name: 'Alerte Froid (°C)',
      value: coldAlert,
      info: 'Risque de grand froid à partir de -20°C',
      setter: setColdAlert,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteCities = await getFavoriteCity(userId);
        const weatherDataArray = [];

        for (const city of favoriteCities) {
          const weatherData = await getCityWeather(city.lat, city.lon);
          weatherDataArray.push({ city, weatherData })
          ;
        }
        setMeteoData(weatherDataArray);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  const increaseValue = (setValue) => {
    setValue((prevValue) => prevValue + 1);
  };

  const decreaseValue = (setValue, alertName) => {
    setValue((prevValue) => {
      if (alertName === coldAlert) {
        return prevValue - 1;
      } else {
        return prevValue > 0 ? prevValue - 1 : 0;
      }
    });
  };
  

  const showAlertInfo = (alert) => {
    setSelectedAlert(alert);
    setInfoVisible(true);
  };

  const hideAlertInfo = () => {
    setSelectedAlert('');
    setInfoVisible(false);
  };

  const saveAlertPreferences = async () => {
    const preferences = {
      windThreshold: windAlert,
      rainThreshold: rainAlert,
      heatThreshold: heatAlert,
      coldThreshold: coldAlert,
    };
    await storeAlertPreferences(userId, preferences);
    checkAlertThresholds(userId, meteoData, preferences);
  };

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await getAlertPreferences(userId);
        if (preferences) {
          setWindAlert(preferences.windThreshold);
          setRainAlert(preferences.rainThreshold);
          setHeatAlert(preferences.heatThreshold);
          setColdAlert(preferences.coldThreshold);
        } else {
          setWindAlert(50);
          setRainAlert(10);
          setHeatAlert(30);
          setColdAlert(0);
        }
      } catch (error) {
        console.error('Error loading alert preferences:', error);
      }
    };
  
    loadPreferences();
  }, [userId]);

  useEffect(() => {
    if (meteoData) {
      checkAlertThresholds(userId, meteoData);
    }
  }, [userId, meteoData]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {meteoData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherText}>City: {meteoData[0].weatherData.name}</Text>
            <Text style={styles.weatherText}>Weather: {meteoData[0]?.weatherData?.weather?.[0]?.description}</Text>
            <Text style={styles.weatherText}>Temperature: {meteoData[0]?.weatherData?.main?.temp_min}°C</Text>
            <Text style={styles.weatherText}>Humidity: {meteoData[0]?.weatherData?.main?.humidity}%</Text>
          </View>
        )}

    </View>
      {alerts.map((alert, index) => (
        <View key={index} style={styles.alertContainer}>
          <TouchableOpacity onPress={() => showAlertInfo(alert.info)}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>ℹ</Text>
            </View>
          </TouchableOpacity> 
          <Text style={styles.alertText}>{alert.name}:</Text>
          <View style={styles.valueContainer}>
          <TouchableOpacity style={styles.button} onPress={() => decreaseValue(alert.setter, alert.value)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
            <Text style={styles.alertValue}>{alert.value}</Text>
            <TouchableOpacity style={styles.button} onPress={() => increaseValue(alert.setter)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={saveAlertPreferences}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      {infoVisible && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Informations:</Text>
          <Text style={styles.infoText}>{selectedAlert}</Text>
          <TouchableOpacity onPress={hideAlertInfo}>
            <Text style={styles.hideInfoText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 10,
  },
  infoIcon: {
    fontSize: 18,
    color: 'white',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    marginRight: 10,
  },
  alertValue: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  infoContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  hideInfoText: {
    color: '#007bff',
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20, 
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default WeatherAlertSettings;

