import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Pressable, FlatList } from 'react-native';
import { getCityGPSCoord, getCityWeather } from "/api/openWeather";
import { DonneesMeteo } from "/models/DonneesMeteo";
import { useState, useEffect } from 'react'


export default function App() {
  const [locations, setLocations] = useState([]);
  const [meteo, setMeteo] = useState({});
  const [search, onChangeSearch] = useState('');
  const [list, onchangeList] = useState('');
  const [showBar, onChangeShowBar] = useState(false);
  let villeLat;
  let villeLon;
  let testMeteo;
  let villeRecherchee;
  //let villeRecherchee = getCityGPSCoord(search);
  //console.log("VilleRecherchee", villeRecherchee);

  console.log(list);


  useEffect(() => {
    
  }, []); 

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Api is called');
      console.log(search);
      villeRecherchee = getCityGPSCoord(search);
      villeRecherchee.then((result) => {
        console.log(result);
        if(list === ''){
          villeLat = result[0].lat;
          villeLon = result[0].lon;
        } else {
          villeLat = result[list].lat;
          villeLon = result[list].lon;
        }
        console.log(villeLat);
        
        setLocations(result);
        console.log(locations);
        getCityWeather(villeLat, villeLon).then((val) => {
          console.log(val);
          
          //setMeteo(testMeteo);
          //setMeteo(val);
          const dateSunrise = new Date(val.sys.sunrise * 1000);
          const dateSunset = new Date(val.sys.sunset * 1000);
          testMeteo = new DonneesMeteo.Builder()
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


  console.log(locations);
  //console.log(villeRecherchee);
  console.log(meteo);
  //console.log(meteoMain.temp);
  console.log(testMeteo);



console.log("FIN");

    
  return (
    <View style={styles.container}>
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
            <Text id={key}>
              <ul>
                <li key={key}>{key} : {location.name}, {location.state}, {location.country} - {meteo.description} - {meteo.temperatureActuelle}°</li>
              </ul>
              </Text>

              <FlatList
                data={[{title: 'Title Text', key: 'item1'}]}
                renderItem={({item, index, separators}) => (
                  <TouchableHighlight
                    key={item.key}
                    onPress={() => onchangeList(key)}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View style={{backgroundColor: 'white'}}>
                      <Text>{location.name}, {location.state}, {location.country}</Text>
                    </View>
                  </TouchableHighlight>
                )}
              />
          </View>
          
        );
      })}
          <Text>TEST !</Text>
              
      </View>
      <Text style={styles.title}>HELLOOOOO WOOORLD !!!!</Text>
      <Text>Ceci est un sous-titre </Text>
      <Text>Objet testMeteo :  </Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

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