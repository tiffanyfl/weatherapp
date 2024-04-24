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


export let favoriteList = new FavoriteCities([]);
const HomeScreen = ({}) => {
  const navigation = useNavigation();

  const [userUid, setUserUid] = useState(null);
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

  // Authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService.auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        authService.getPseudo(user.uid)
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
    
  console.log("user id : ", userUid);

  // Récupérer le tableau des villes favorites du user depuis la BDD
  //useEffect(() => {
    getFavoriteCity(userUid).then((item) => {
      console.log(item);
      //setTableau(item);
      if(item.length > 0){
        for(let i = 0; i < item.length; i++){
          console.log(item[i]);
  
          setTableau(tableau => [...tableau,item[i]]);
          //tableau.push(item[i]);
          //tableau[i] = item[i];
        }
      }
      
      //tableau.push(item);
      console.log(tableau);
      return false;
  
    });
  //}, [getFavoriteCity]);

  

  

  // search for a city and show weather data when user finished typing in the search bar
  useEffect(() => {
    
    if(search == ''){
      //console.log("On ne recherche rien encore");
    } else {
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



  let sayHello2 = () => {
    console.log(tableau);
    cityObject.subscribe(favoriteList);
    cityObject.notify(cityObject.nom);
    cityObject.setFavoris(true);
    favoriteList.setFavoriteCitiesArray(cityObject);

    let newElement2 = {"nom": cityObject.nom, "lat": cityObject.lat, "lon": cityObject.lon};
    if(tableau.length == 0){
      setTableau(newElement2);
    } else {
    setTableau(tableau => [...tableau, newElement2]);

    }
    console.log(tableau);

    storeFavoriteCity(userUid, tableau);
    //storeFavoriteCity(userUid, newElement2);

    navigation.navigate('Favorite', tableau);
  }
  
  
  sayHello = () => {
    cityObject.subscribe(favoriteList);
    cityObject.notify(cityObject.nom);
    cityObject.setFavoris(true);
    favoriteList.setFavoriteCitiesArray(cityObject);  
    

    //console.log(tableau);

    for (let i = 0; i < favoriteList.favoriteCitiesArray.length; i++){
    let newElement = {"nom": favoriteList.favoriteCitiesArray[i].nom, "lat": favoriteList.favoriteCitiesArray[i].lat, "lon": favoriteList.favoriteCitiesArray[i].lon};
      //setTableau(tableau => [...tableau, newElement]);
      //setTableau([tableau, newElement]);
      tableau[i] = newElement;
      //
      //tableau.push(newElement);

    }
    let favoriteListLast = favoriteList.favoriteCitiesArray.slice(-1);
    let newElement1 = {"nom": favoriteListLast[0].nom, "lat": favoriteListLast[0].lat, "lon": favoriteListLast[0].lon};
    let newElement2 = {"nom": cityObject.nom, "lat": cityObject.lat, "lon": cityObject.lon};
    
    //setTableau(tableau => [...tableau, newElement]);
    setTableau(tableau => [...tableau, newElement2]);
    //tableau.push(newElement1);
    console.log(newElement1);
    console.log(newElement2);
    //console.log(tableau);

    console.log(favoriteList);
    storeFavoriteCity(userUid, tableau);
    //storeFavoriteCity(userUid, newElement2);

    navigation.navigate('Favorite', tableau);
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
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: "#C4CFB2", width: "90%", borderColor: '#C4CFB2'}}>
      <TextInput
            style={styles.input}
            onChangeText={input => onChangeSearch(input)}
            value={search}
            placeholder='search'
        />
         {locations.map((location, key) => {
          return (
            <View>
                <FlatList
                  data={[{title: 'Title Text', key: 'item1'}]}
                  renderItem={({item, index, separators}) => (
                    <TouchableOpacity
                      key={item.key}
                      onPress={() => onchangeList(key)}>
                      <View style={{backgroundColor: 'white'}}>
                        <Text>{location.name}, {location.state}, {location.country}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  
                />
            </View>
          );
      })}           
      </View>

      {(Object.keys(weather).length) > 0 ? (
        <View style={{width: "90%",borderColor: '#C4CFB2'}}>
         <Button
             title="Add to favorites"
             onPress={sayHello}
          />
          <Text style={styles.title}>Hello {cityName} !!!!</Text>
          <WeatherComponent obj={weather}></WeatherComponent>
          </View>
        ) : null }

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Logged in {pseudo}</Text>
        <Button title="Log out" onPress={logout} />
      </View>
      
    </SafeAreaView>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3B18A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;