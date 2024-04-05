import { StyleSheet, Text, Button, View, TextInput, TouchableHighlight, TouchableOpacity, Pressable, FlatList } from 'react-native';
import {DonneesMeteoController} from '../controllers/DonneesMeteo.controller';
import { useState, useEffect } from 'react';
import { getCityGPSCoord, getCityWeather } from "../api/openWeather";
import { DonneesMeteo } from "../models/DonneesMeteo";
import { Ville } from "../models/Ville";
import { StatusBar } from 'expo-status-bar';
import { TemplateMeteo } from '../components/TemplateMeteo';
import authService from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

const HomeScreen = ({}) => {
    const navigation = useNavigation();

    const [userUid, setUserUid] = useState(null);
    const [pseudo, setPseudo] = useState('');

    const [locations, setLocations] = useState([]);
    const [meteo, setMeteo] = useState({});
    const [search, onChangeSearch] = useState('');
    const [list, onchangeList] = useState('');
    const [cityName, setCityName] = useState('');
    const [showBar, onChangeShowBar] = useState(false);
    let villeLat;
    let villeLon;
    let testMeteo;
    let testVille;
    let villeRecherchee;
    //let villeRecherchee = getCityGPSCoord(search);
    //console.log("VilleRecherchee", villeRecherchee);

    console.log(list);


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
    

    useEffect(() => {
      const timer = setTimeout(() => {
        //console.log('Api is called');
        //console.log(search);
        villeRecherchee = getCityGPSCoord(search);
        villeRecherchee.then((result) => {
          console.log(result);
          if(list === ''){
            villeLat = result[0].lat;
            villeLon = result[0].lon;
            testVille = new Ville(result[0].name, result[0].lat, result[0].lon, false);
            console.log(testVille);
            setCityName(result[0].name);
          } else {
            villeLat = result[list].lat;
            villeLon = result[list].lon;
            testVille = new Ville(result[list].name, result[list].lat, result[list].lon, false);
            console.log(testVille);
            setCityName(result[list].name);
          }
          //console.log(villeLat);
          console.log(testVille);
          setLocations(result);
          //console.log(locations);
          getCityWeather(villeLat, villeLon).then((val) => {
            //console.log(val);
            
            //setMeteo(testMeteo);
            //setMeteo(val);
            const dateSunrise = new Date(val.sys.sunrise * 1000);
            const dateSunset = new Date(val.sys.sunset * 1000);
            testMeteo = new DonneesMeteo.Builder()
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

            let ii = testMeteo.getTemperatureActuelle();
            console.log(ii);
    
            setMeteo(testMeteo);
            //console.log(getall);
            //console.log(testMeteo.getTemperatureActuelle());
            return val;
          });
      
          return result;
        });
      }, 1200)
      return () => clearTimeout(timer)
    }, [search, list]);


    //console.log(locations);
    //console.log(villeRecherchee);
    //console.log(meteo);
    //console.log(meteoMain.temp);
    console.log(testMeteo);



  console.log("FIN");


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {cityName} !!!!</Text>
      <View style={{backgroundColor: "#C4CFB2", width: "90%",borderColor: '#C4CFB2'}}>
      <TextInput
            style={styles.input}
            onChangeText={input => onChangeSearch(input)}
            value={search}
            placeholder='rechercher'
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

        {(Object.keys(meteo).length) > 0 ? (
      <View style={{width: "90%",borderColor: '#C4CFB2'}}>
      <Button
          title="Go to Favorite"
          onPress={() => navigation.navigate('Favorite')}
        />
          <TemplateMeteo obj={meteo}></TemplateMeteo>
        </View>

          ) : null }

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logged in {pseudo}</Text>
      <Button title="Log out" onPress={logout} />
    </View>
      
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3B18A',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;