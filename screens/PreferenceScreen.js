// Ecran de paramètrage des alertes

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { storeAlertPreferences, getAlertPreferences, checkAlertThresholds } from '../services/AlertNotification'; 
import { auth } from '../services/firebase';
import { WeatherAlertPreferences } from '../models/AlertPreferences.model';
import alertFromFavorite from '../controllers/AlertFromFavorite.controller';

const PreferenceScreen = () => {
  const userId = auth.currentUser.uid;
  const meteoData = alertFromFavorite(userId);

  const [alertPreferences, setAlertPreferences] = useState(WeatherAlertPreferences);
  const [infoVisible, setInfoVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState('');

  const alerts = [
    {
      name: 'Alerte Typhon (km/h)',
      key: 'windThreshold',
      info: 'Risque de typhon à partir de 250km/h',
    },
    {
      name: 'Alerte Pluie Diluvienne (mm/h)',
      key: 'rainThreshold', 
      info: 'Risque de pluie diluvienne à partir de 5 mm/h',
    },
    {
      name: 'Alerte Canicule (°C)',
      key: 'heatThreshold', 
      info: 'Risque de canicule à partir de 40°C',
    },
    {
      name: 'Alerte Froid (°C)',
      key: 'coldThreshold',
      info: 'Risque de grand froid à partir de -20°C',
    },
  ];

  const increaseValue = (key) => {
    setAlertPreferences(prevState => ({ ...prevState, [key]: prevState[key] + 1 }));
  };

  const decreaseValue = (key) => {
    setAlertPreferences(prevState => ({
      ...prevState,
      [key]: key === 'coldThreshold' ? Math.max(prevState[key] - 1, 0) : Math.max(prevState[key] - 1, 0)
    }));
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
    await storeAlertPreferences(userId, alertPreferences);
    checkAlertThresholds(userId, meteoData, alertPreferences);
  };

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await getAlertPreferences(userId);
        if (preferences) {
          setAlertPreferences(preferences);
        } else {
          setAlertPreferences(WeatherAlertPreferences);
        }
      } catch (error) {
        console.error('Error loading alert preferences:', error);
      }
    };
  
    loadPreferences();
  }, [userId]);


  return (
    <View style={styles.container}>
      {alerts.map((alert, index) => (
        <View key={index} style={styles.alertContainer}>
          <TouchableOpacity onPress={() => showAlertInfo(alert.info)}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>ℹ</Text>
            </View>
          </TouchableOpacity> 
          <Text style={styles.alertText}>{alert.name}:</Text>
          <View style={styles.valueContainer}>
            <TouchableOpacity style={styles.button} onPress={() => decreaseValue(alert.key)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.alertValue}>{alertPreferences[alert.key]}</Text>
            <TouchableOpacity style={styles.button} onPress={() => increaseValue(alert.key)}>
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

export default PreferenceScreen;