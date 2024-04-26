import { Text, View, Button, SafeAreaView, ScrollView  } from 'react-native';
import { useState, useEffect } from 'react';
import { getCityWeather } from "../api/openWeather";

import { WeatherData } from "../models/WeatherData.model";

import { WeatherComponent } from '../components/WeatherComponent';

import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

import { getFavoriteCity, deleteFavoriteCity } from '../services/FavoriteCities';

import { general, criteres } from '../css/styles';

const FavoriteScreen = ({route}) => {
  const userId = auth.currentUser.uid;
  const navigation = useNavigation();

  const [weather, setWeather] = useState([]);
  const [citiesInDb, setCitiesInDb] = useState([]);

  let weatherDataObject;
  
  //console.log("user id : ", userId);

  useEffect(() => {
    // get favoritecities from db
    getFavoriteCity(userId).then((item) => {
      console.log(item);
      setCitiesInDb(item);
    
      // for every city from db, get weather & create WeatherData object
      for(let i = 0; i < item.length; i++){
        getCityWeather(item[i].lat, item[i].lon).then((val) => {
        const dateSunrise = new Date(val.sys.sunrise * 1000);
        const dateSunset = new Date(val.sys.sunset * 1000);
        weatherDataObject = new WeatherData.Builder()
        .setCity(item[i].name)
        .setDescription(val.weather[0].description)
        .setTemperature(val.main.temp)
        .setTemperatureMin(val.main.temp_min)
        .setTemperatureMax(val.main.temp_max)
        .setFeelsLike(val.main.feels_like)
        .setHumidity(val.main.humidity)
        .setPressure(val.main.pressure)
        .setClouds(val.clouds.all)
        .setIcon(val.weather[0].icon)
        .setWindDegree(val.wind.deg)
        .setWindSpeed(val.wind.speed)
        .setSunriseHour(dateSunrise.getHours().toString())
        .setSunriseMinute(dateSunrise.getMinutes().toString())
        .setSunsetHour(dateSunset.getHours().toString())
        .setSunsetMinute(dateSunset.getMinutes().toString())
        .build();
        if(weather.length = 0){
          setWeather(weatherDataObject);
        } else {
          setWeather(weather => [...weather, weatherDataObject]);
        }
        
        return val;
        });
      }
    }).catch((error)=>{
      console.log(error)
   });
  }, [route]);

  //console.log(weather);
  //console.log(citiesInDb);

  // delete a city from favoriteCities
  let deleteCityFromFavorite = (location, key) => {
    //console.log(citiesInDb);
    let cityInDb;
    for(let i = 0; i < citiesInDb.length; i++){
      if(citiesInDb[i].name == location.city){
        cityInDb = citiesInDb[i];
      }
    }
    deleteFavoriteCity(userId, cityInDb, key);
    setCitiesInDb(citiesInDb.filter(item => item.name !== location.city));

    setWeather(weather.filter(item => item.city !== location.city));
  }

  return (
    <SafeAreaView style={general.backg}>
      <ScrollView> 
      {(weather.length) > 0 ? (
        weather.map((location, key) => {
          //console.log(location);
          return (
            <View style={{padding: 10}}>
              <Button
                title="Delete from favorites"
                onPress={() => deleteCityFromFavorite(location, key)}
                color="#13315C"
              />
              <WeatherComponent obj={location}></WeatherComponent>
            </View>
          );
        })
      ) : 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}><Text style={{color: '#13315C', fontWeight: 'bold', fontSize: 20}}>Add a city to favorite from Home page 💕</Text></View> 
      }
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriteScreen;