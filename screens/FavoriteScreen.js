import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView  } from 'react-native';
import { useState, useEffect } from 'react';
import { favoriteList } from "./HomeScreen";
import { getCityWeather } from "../api/openWeather";

import { WeatherData } from "../models/WeatherData.model";

import { WeatherComponent } from '../components/WeatherComponent';

import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

import { getFavoriteCity, deleteFavoriteCity } from '../services/FavoriteCities';


const FavoriteScreen = ({route }) => {
  const userId = auth.currentUser.uid;
  const navigation = useNavigation();

  const [weather, setWeather] = useState([]);
  const [citiesInDb, setCitiesInDb] = useState([]);

  let weatherDataObject;
  
  //console.log("user id : ", userId);

  useEffect(() => {
    // get favoritecities from db
    getFavoriteCity(userId).then((item) => {
      //console.log(item);
      setCitiesInDb(item);
    
      // for every city from db, get weather & create WeatherData object
      for(let i = 0; i < item.length; i++){
        getCityWeather(item[i].lat, item[i].lon).then((val) => {
        const dateSunrise = new Date(val.sys.sunrise * 1000);
        const dateSunset = new Date(val.sys.sunset * 1000);
        weatherDataObject = new WeatherData.Builder()
        .setNomVille(item[i].nom)
        .setDescription(val.weather[0].description)
        .setTemperatureActuelle(val.main.temp)
        .setTemperatureMin(val.main.temp_min)
        .setTemperatureMax(val.main.temp_max)
        .setRessenti(val.main.feels_like)
        .setHumidite(val.main.humidity)
        .setPression(val.main.pressure)
        .setNuages(val.clouds.all)
        .setIcone(val.weather[0].icon)
        .setVentDegre(val.wind.deg)
        .setVentVitesse(val.wind.speed)
        .setLeverSoleilHeure(dateSunrise.getHours().toString())
        .setLeverSoleilMinute(dateSunrise.getMinutes().toString())
        .setCoucherSoleilHeure(dateSunset.getHours().toString())
        .setCoucherSoleilMinute(dateSunset.getMinutes().toString())
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
      if(citiesInDb[i].nom == location.nomVille){
        cityInDb = citiesInDb[i];
      }
    }
    deleteFavoriteCity(userId, cityInDb, key);
    setCitiesInDb(citiesInDb.filter(item => item.nom !== location.nomVille));

    setWeather(weather.filter(item => item.nomVille !== location.nomVille));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView> 
      {(weather.length) > 0 ? (
        weather.map((location, key) => {
          //console.log(location);
          return (
            <View style={{padding: 10}}>
              <Button
                title="Delete from favorites"
                onPress={() => deleteCityFromFavorite(location, key)}
                color="#7E8572"
              />
              <WeatherComponent obj={location}></WeatherComponent>
            </View>
          );
        })
      ) : 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Add a city to favorite from Home page 💕</Text></View> 
      }

<Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3B18A',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: "#C4CFB2",
    width: "90%",
    width: 600,
    height: 40,
  },
});

export default FavoriteScreen;