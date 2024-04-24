import { StyleSheet, Text, View, TextInput, TouchableHighlight, Pressable, FlatList, Button, TouchableOpacity, SafeAreaView, ScrollView  } from 'react-native';
import { useState, useEffect } from 'react';
import { favoriteList } from "./HomeScreen";
import { getCityWeather } from "../api/openWeather";

import { WeatherData } from "../models/WeatherData.model";

import { WeatherComponent } from '../components/WeatherComponent';

import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

import { getFavoriteCity } from '../services/FavoriteCities';


const FavoriteScreen = ({route, param }) => {
  console.log(param);
  const userId = auth.currentUser.uid;
  const navigation = useNavigation();
  //let locations = favoriteList.favoriteCitiesArray;

  const [weather, setWeather] = useState([]);
  const [citiesInDb, setCitiesInDb] = useState([]);

  //let locationWeatherArray = [];
  let weatherDataObject;
  
  console.log("user id : ", userId);

  useEffect(() => {
    let getFavoriteCitiesDb = getFavoriteCity(userId);
    console.log(getFavoriteCitiesDb);
    getFavoriteCitiesDb.then((item) => {
      //console.log(item);
      setCitiesInDb(item);
      //citiesInDb.push(item);
      //console.log(citiesInDb);
      //return item;
    
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
        //setWeather(weatherDataObject);
        if(weather.length = 0){
          setWeather(weatherDataObject);
        } else {
          //weather.slice(1);
          setWeather(weather => [...weather, weatherDataObject]);
        }
        
        return val;
        });
      }
    }).catch((error)=>{
      console.log(error)
   });
  }, [route]);
//}, []);

  //console.log(locations.length);

  

  //console.log(citiesInDb);
  //console.log(locationWeatherArray);
  //console.log(locationWeatherArray.length);
  //setCitiesInDb(locationWeatherArray);
  console.log(weather);
  //console.log(weather.length);
  console.log(citiesInDb);

  let sayGoodbye = () => {
    console.log("Goodbye my friend !");
  }



    return (
      <SafeAreaView>
      <Text>Hello !!!!</Text>
      <ScrollView> 
{weather.map((location, key) => {
        console.log(location);
        //console.log(key);
        console.log("je passe par le map de meteo dans le return");
        return (
          <View>
        <Button
             title="Delete from favorites"
             onPress={sayGoodbye}
          />
        <WeatherComponent obj={location}></WeatherComponent>
        </View>
        );
      })}
      </ScrollView>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />
        
    </SafeAreaView>
    );
};

export default FavoriteScreen;