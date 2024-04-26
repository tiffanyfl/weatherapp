// Ecran de paramètrage des alertes

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { storeAlertPreferences, getAlertPreferences, checkAlertThresholds } from '../services/AlertNotification'; 
import { auth } from '../services/firebase';
import { WeatherAlertPreferences } from '../models/AlertPreferences.model';
import alertFromFavorite from '../controllers/AlertFromFavorite.controller';
import { general, alertcss } from '../css/styles';

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
    <View style={general.backg}>
      {alerts.map((alert, index) => (
        <View key={index} style={alertcss.alertContainer}>
          <TouchableOpacity onPress={() => showAlertInfo(alert.info)}>
            <View style={alertcss.infoIconContainer}>
              <Text style={alertcss.infoIcon}>ℹ</Text>
            </View>
          </TouchableOpacity> 
          <Text style={alertcss.alertText}>{alert.name}:</Text>
          <View style={alertcss.valueContainer}>
            <TouchableOpacity style={alertcss.button} onPress={() => decreaseValue(alert.key)}>
              <Text style={alertcss.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={alertcss.alertValue}>{alertPreferences[alert.key]}</Text>
            <TouchableOpacity style={alertcss.button} onPress={() => increaseValue(alert.key)}>
              <Text style={alertcss.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={alertcss.saveButton} onPress={saveAlertPreferences}>
        <Text style={alertcss.saveButtonText}>Save</Text>
      </TouchableOpacity>
      {infoVisible && (
        <View style={alertcss.infoContainer}>
          <Text style={alertcss.infoTitle}>Informations:</Text>
          <Text style={alertcss.infoText}>{selectedAlert}</Text>
          <TouchableOpacity onPress={hideAlertInfo}>
            <Text style={alertcss.hideInfoText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PreferenceScreen;