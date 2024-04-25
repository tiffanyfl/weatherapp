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

  let villeLat;
  let villeLon;
  let weatherDataObject;
  let testVille;
  let villeRecherchee;
  const [tableau, setTableau] = useState([]);
  
  let sayHello;

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
      //console.log(item);
      //setTableau(item);
      /*if(item.length == 0){
        setTableau([]);
      } else {
      setTableau(item);
  
      }*/
      setTableau(item);
      //tableau.push(item);
      //console.log(tableau);
      return item;
  
    });
    /*return () => {
      ignore = true;
    };*/
  }, 5000);
  //return () => clearTimeout(timer)
  //console.log(tableau);
  

  

  // search for a city and show weather data when user finished typing in the search bar
  useEffect(() => {
    
    if(search !== ''){
      const timer = setTimeout(() => {
      //console.log("On recherche quelque chose :  " + search);

        villeRecherchee = getCityGPSCoord(search);
        villeRecherchee.then((result) => {
        if(list === ''){
          villeLat = result[0].lat;
          villeLon = result[0].lon;
          testVille = new City(result[0].name, result[0].lat, result[0].lon, false);
          
          setCityObject(testVille);
          setCityName(result[0].name);
        } else {
          villeLat = result[list].lat;
          villeLon = result[list].lon;
          testVille = new City(result[list].name, result[list].lat, result[list].lon, false);
          
          setCityObject(testVille);
          setCityName(result[list].name);
        }
        
        setLocations(result);
        getCityWeather(villeLat, villeLon).then((val) => {
          const dateSunrise = new Date(val.sys.sunrise * 1000);
          const dateSunset = new Date(val.sys.sunset * 1000);
          weatherDataObject = new WeatherData.Builder()
          .setNomVille(testVille.nom)
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
    
          setWeather(weatherDataObject);
          return val;
        });
        
        return result;
      });
      }, 1200)
      return () => clearTimeout(timer)

    }
    
  }, [search, list]);
  
  
  sayHello = () => {
    cityObject.subscribe(favoriteList);
    cityObject.notify(cityObject.nom);
    cityObject.setFavoris(true);
    favoriteList.setFavoriteCitiesArray(cityObject);  
    

    //console.log(tableau);

   // for (let i = 0; i < favoriteList.favoriteCitiesArray.length; i++){
   // let newElement = {"nom": favoriteList.favoriteCitiesArray[i].nom, "lat": favoriteList.favoriteCitiesArray[i].lat, "lon": favoriteList.favoriteCitiesArray[i].lon};
      //setTableau(tableau => [...tableau, newElement]);
      //setTableau([tableau, newElement]);
   //   tableau[i++] = newElement;
      //
      //tableau.push(newElement);

   // }
    let favoriteListLast = favoriteList.favoriteCitiesArray.slice(-1);
    let newElement1 = {"nom": favoriteListLast[0].nom, "lat": favoriteListLast[0].lat, "lon": favoriteListLast[0].lon};
    let newElement2 = {"nom": cityObject.nom, "lat": cityObject.lat, "lon": cityObject.lon};
    
    //setTableau(tableau => [...tableau, newElement]);
    //setTableau(tableau => [...tableau, newElement2]);
    tableau.push(newElement2);
    //console.log(newElement1);
    console.log(newElement2);
    console.log(tableau);

    storeFavoriteCity(userId, tableau);
    //storeFavoriteCity(userUid, newElement2);

    //navigation.navigate('Favorite', tableau);
    navigation.navigate('Favorite', newElement2);
  };

    function searchList({isClicked}){
      if(!isClicked) {
        return (
          console.log("test")
        );
      }
    }
  //console.log(weather);

  return (
    <SafeAreaView style={general.backg}>
      <View style={{padding: 10}}>
        <Text style={{color: 'Black', fontWeight: 'bold'}}>Welcome {pseudo}</Text>
        <Button color="#7E8572" title="Log out" onPress={logout} />
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
                      <View style={{backgroundColor: '#C4CFB2', color: 'white'}}>
                        <Text style={{ color: '#7E8572'}}>{location.name}, {location.state}, {location.country}</Text>
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
             onPress={sayHello}
             color="#7E8572"
          />
          <WeatherComponent obj={weather}></WeatherComponent>
          </View>
        ) : 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}><Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Search a city to see the weather 👀</Text></View> 
        }

      
      
    </SafeAreaView>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3B18A',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'flex-start'
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: "#C4CFB2",
    width: 300,
    height: 40,
  },
});

export default HomeScreen;