import { StyleSheet, Text, Button, View, TextInput, TouchableHighlight, TouchableOpacity, Pressable, FlatList, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';

import { getCityGPSCoord, getCityWeather } from "../api/openWeather";

import { WeatherData } from "../models/WeatherData.model";
import { City } from "../models/City.model";
import { FavoriteCities } from "../models/FavoriteCities.model";

import { WeatherComponent } from '../components/WeatherComponent';

import authService from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { storeFavoriteCity, getFavoriteCity } from '../services/FavoriteCities';
import { WeatherAlertPreferences } from '../models/AlertPreferences.model';
import alertFromFavorite from '../controllers/AlertFromFavorite.controller';
import { auth } from '../services/firebase';
import { general, criteres } from '../css/styles';


export let favoriteList = new FavoriteCities([]);
const HomeScreen = ({}) => {
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;
  const meteoData = alertFromFavorite(userId);

  const [pseudo, setPseudo] = useState('');

  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [search, onChangeSearch] = useState('');
  const [list, onchangeList] = useState('');
  const [cityObject, setCityObject] = useState({});
  const [cityName, setCityName] = useState('');

  let cityLat;
  let cityLon;
  let weatherDataObject;
  let cityModel;
  let citySearched;
  const [tableau, setTableau] = useState([]);
  
  let addCityToFavorite;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService.auth, (user) => {
      if (user) {
        authService.getPseudo(userId)
                  .then(userPseudo => {
                      console.log("ici" + userPseudo);
                      setPseudo(userPseudo);
                  })
                  .catch(error => {
                      console.error("Error fetching pseudo:", error);
                  });
      } else {
        navigation.reset({
          index: 1,
          routes: [
            { name: 'LoginScreen'},
          ]
        });
        console.log("retour 1");
        //navigation.navigate('LoginScreen');
      }

    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      navigation.reset({
        index: 1,
        routes: [
          { name: 'LoginScreen'},
        ]
      });
      await authService.signOut();
    } catch (error) {
      console.error(error);
    }
};

  // Récupérer le tableau des villes favorites du user depuis la BDD
  
  useEffect(() => {
    
  }, [userId]);
  const timer = setTimeout(() => {
    let ignore = false;
    getFavoriteCity(userId).then((item) => {
      if(item.length == 0){
        setTableau([]);
      } else {
      setTableau(item);
  
      }
      return item;
  
    });
  }, 5000);
  //console.log(tableau);

  // search for a city and show weather data when user finished typing in the search bar
  useEffect(() => {
    
    if(search !== ''){
      const timer = setTimeout(() => {
        citySearched = getCityGPSCoord(search);

        citySearched.then((result) => {
        if(list === ''){
          cityLat = result[0].lat;
          cityLon = result[0].lon;
          cityModel = new City(result[0].local_names.fr, result[0].lat, result[0].lon, false);

          setCityObject(cityModel);
          setCityName(result[0].local_names.fr);
        } else {
          cityLat = result[list].lat;
          cityLon = result[list].lon;
          cityModel = new City(result[list].local_names.fr, result[list].lat, result[list].lon, false);
          
          setCityObject(cityModel);
          setCityName(result[list].local_names.fr);
        }
        
        setLocations(result);
        getCityWeather(cityLat, cityLon).then((val) => {
          const dateSunrise = new Date(val.sys.sunrise * 1000);
          const dateSunset = new Date(val.sys.sunset * 1000);
          weatherDataObject = new WeatherData.Builder()
          .setCity(cityModel.name)
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
    
          setWeather(weatherDataObject);
          return val;
        });
        
        return result;
      });
      }, 1200)
      return () => clearTimeout(timer)

    }
    
  }, [search, list]);
  
  
  addCityToFavorite = () => {
    cityObject.subscribe(favoriteList);
    cityObject.notify(cityObject.name);
    cityObject.setFavorite(true);
    favoriteList.setFavoriteCitiesArray(cityObject);  
    
    let newElement2 = {"name": cityObject.name, "lat": cityObject.lat, "lon": cityObject.lon};
    
    tableau.push(newElement2);
    //console.log(newElement2);
    //console.log(tableau);

    storeFavoriteCity(userId, tableau);
    //storeFavoriteCity(userUid, newElement2);

    //navigation.navigate('Favorite', tableau);
    navigation.navigate('Favorite', newElement2);
  };
  //console.log(weather);

  return (
    <SafeAreaView style={general.backg}>
      <View style={{padding: 10}}>
        <Text style={{color: 'Black', fontWeight: 'bold'}}>Welcome {pseudo}</Text>
        <Button color="#13315C" title="Log out" onPress={logout} />
      </View>
      <View style={{ padding: 40 }}>
      <TextInput
            style={general.input}
            onChangeText={input => onChangeSearch(input)}
            value={search}
            placeholder='search a city'
        />
         {locations.map((location, key) => {
          return (
            <View style={{height: 20}}>
                <FlatList
                  data={[{title: 'Title Text', key: 'item1'}]}
                  renderItem={({item, index, separators}) => (
                    <TouchableOpacity
                      key={item.key}
                      onPress={() => onchangeList(key)}>
                      <View style={{backgroundColor: '#5EB1BF'}}>
                        <Text style={{ color: '#13315C'}}>{location.name}, {location.state}, {location.country}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  
                />
            </View>
          );
      })}           
      </View>

      {(Object.keys(weather).length) > 0 ? (
        <View style={{ flex: 1 }}>
         <Button
             title="Add to favorites"
             onPress={addCityToFavorite}
             color="#13315C"
          />
          <WeatherComponent obj={weather}></WeatherComponent>
          </View>
        ) : 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}><Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Search a city to see the weather 👀</Text></View> 
        }

      
      
    </SafeAreaView>
    
    
  );
};

export default HomeScreen;