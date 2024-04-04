import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView , Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from 'react'

export default function App() {

  let cityWeatherName;
  let citiesArray;
  const [showSearch, toogleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [text, onChangeText] = useState('');
  const [activeCity, setActiveCity] = useState('');
  const [activeTemperature, setActiveTemperature] = useState(0);
  const [activeWeatherDescription, setActiveWeatherDescription] = useState('');
  const [activeWeatherIcon, setActiveWeatherIcon] = useState('');
  const [activeHumidity, setActiveHumidity] = useState(0);
  const [activePressure, setActivePressure] = useState(0);
  const [currentFeelsLike, setCurrentFeelsLike] = useState(0);
  const [currentTempMin, setCurrentTempMin] = useState(0);
  const [currentTempMax, setCurrentTempMax] = useState(0);
  const [currentWindDegree, setCurrentWindDegree] = useState(0);
  const [currentWindSpeed, setCurrentWindSpeed] = useState(0);
  const [activeCitySunrise, setActiveCitySunrise] = useState(0);
  const [activeCitySunriseHour, setActiveCitySunriseHour] = useState(0);
  const [activeCitySunriseMinute, setActiveCitySunriseMinute] = useState(0);
  const [activeCitySunset, setActiveCitySunset] = useState(0);
  const [activeCitySunsetHour, setActiveCitySunsetHour] = useState(0);
  const [activeCitySunsetMinute, setActiveCitySunsetMinute] = useState(0);
  const [currentClouds, setCurrentClouds] = useState(0);

/* API REQUEST : find the weather thanks to the city lat and long */
async function getWeatherMain(lat, long) {
  //console.log(lat + long);
	const response = await fetch(
		'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + long + '&units=metric&lang=fr&appid=6c8f30fee7b427293f0eeb0761a188a5',
		{
			method: 'GET',
		}
	);
	const data = await response.json(); // Extracting data as a JSON Object from the response
  //console.log('data : ' + data);
  //console.log(data);
  //console.log(data.main.temp);
  setActiveTemperature(data.main.temp);
  setActiveWeatherDescription(data.weather[0].description);
  let weatherIcon = data.weather[0].icon + '@4x.png';
  setActiveWeatherIcon(weatherIcon);
  setActiveHumidity(data.main.humidity);
  setActivePressure(data.main.pressure);
  setCurrentFeelsLike(data.main.feels_like);
  setCurrentTempMin(data.main.temp_min);
  setCurrentTempMax(data.main.temp_max);
  setCurrentWindDegree(data.wind.deg);
  setCurrentWindSpeed(data.wind.speed);
  //setActiveCitySunset(data.sys.sunset);
  const dateSunrise = new Date(data.sys.sunrise * 1000);
  const dateSunriseHour = dateSunrise.getHours();
  const dateSunriseMinutes = dateSunrise.getMinutes();
  setActiveCitySunrise(dateSunrise.toString());
  setActiveCitySunriseHour(dateSunriseHour.toString());
  setActiveCitySunriseMinute(dateSunriseMinutes.toString());
  const dateSunset = new Date(data.sys.sunset * 1000);
  const dateSunsetHour = dateSunset.getHours();
  const dateSunsetMinutes = dateSunset.getMinutes();
  setActiveCitySunset(dateSunset.toString());
  setActiveCitySunsetHour(dateSunsetHour.toString());
  setActiveCitySunsetMinute(dateSunsetMinutes.toString());
  setCurrentClouds(data.clouds.all);
}

// Dans recherche, attendre 500 ms avant de prendre en compte la ville qui a été écrite dans la bar de recherche
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Api is called');
    console.log(text);
    getCityWeather(text);
  }, 500)
  return () => clearTimeout(timer)
}, [text]);

/* API REQUEST : find the city that user is looking for */
async function getCityWeather(city) {
  //const url='http://api.openweathermap.org/geo/1.0/direct?q=Paris,FR&appid=6c8f30fee7b427293f0eeb0761a188a5';
  //console.log(url);
	const response = await fetch(
    'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=3&lang=fr&appid=6c8f30fee7b427293f0eeb0761a188a5',
		{
			method: 'GET',
		}
	);
  console.log(response);
	const data2 = await response.json(); // Extracting data as a JSON Object from the response
  var lat = data2[0].lat.toFixed(20);
  //console.log('data 2 : ' + data2);
  console.log(data2);
  citiesArray = data2;
  setLocations(citiesArray);

  console.log("le tableau de locations : ");  
  console.log(locations);
  console.log("le tableau de citiesArray : ");  
  console.log(citiesArray);
  var long = data2[0].lon.toFixed(20);
  //console.log('long = ' + long);
  cityWeatherName = data2[0].local_names.fr;
  //console.log(cityWeatherName);
  setActiveCity(cityWeatherName);
  //console.log("useState : " + activeCity);
  getWeatherMain(lat, long);

}
const city = "Paris"
//getCityWeather(text);
let uriImage = 'https://openweathermap.org/img/wn/' + activeWeatherIcon;
console.log("La ville est : ", text);
//console.log("le tableau de citiesArray en dehors de la fonction : ");  
//console.log(citiesArray);

//console.log("nm de la vie " + cityWeatherName);
//let dateParse = new Date(activeCitySunrise);
//console.log(dateParse);

useEffect(() => {
  const str = '2023-01-19';
  const dateResult = new Date(activeCitySunrise * 1000);
  //console.log(dateResult.getFullYear()); // Tue Jun 21 2022 05:30:00 GMT+0530 (India Standard Time)
  //setActiveCitySunrise(JSON.stringify(dateResult));
}, []);

const dateNow = Date.now();
dateNow.toString();

function handleLocation(loc) {
  console.log('location : ' + loc);
}

function handleSearch(value) {
  setTimeout(() => {
    console.log("value: ", value);
  }, 1200, []);
  console.log("value apres timeout : ", value);
  //getCityWeather(value);
}
const handleTextDebounce = useCallback(setTimeout(handleSearch, 1200), []);

handleLocation(text);



  return (
    <View style={styles.container}>
      <View style={{backgroundColor: "#C4CFB2", width: "90%",borderColor: '#C4CFB2'}}>
      <TextInput
            style={styles.input}
            onChangeText={input => onChangeText(input)}
            value={text}
            placeholder='rechercher'
          />
          <Text>TEST ! {citiesArray}</Text>
              
      </View>
      <View>



      </View>
      
      <Text style={styles.title}>{activeCity}</Text>
      <Text>{dateNow}</Text>
      <Image style={styles.image} source={{ uri : uriImage }} /> 
      <Text>{activeWeatherDescription}</Text>
      <Text style={styles.activeTemperature}>{activeTemperature} °C</Text>
      <ScrollView horizontal={true}>
      <View style={styles.activeCityScrollElement}><Text style={styles.boldText}>Ressenti :</Text><Text> {currentFeelsLike} °C</Text></View>
      <View style={styles.activeCityScrollElement}><Text style={styles.boldText}>Minimal :</Text><Text> {currentTempMin} °C</Text></View>
      <Text>Maximal : {currentTempMax} °C</Text>
      <Text>Humidité : {activeHumidity}</Text>
      <Text>Pression : {activePressure}</Text>
      <Text>Nuages : {currentClouds}</Text>
      <Text>Vent : {currentWindDegree}° et {currentWindSpeed}</Text>
      <Text>Lever du soleil : {activeCitySunriseHour}h{activeCitySunriseMinute}</Text>
      <Text>Coucher du soleil : {activeCitySunsetHour}h{activeCitySunsetMinute}</Text>
      </ScrollView>
      <Text style={styles.title}>{activeCity} {activeTemperature} °C</Text> 
      <ScrollView horizontal={true}>
      <View style={styles.activeCityScrollElement}>
      <Image style={styles.image2} source={{ uri : uriImage }} /> 
      </View>
      <View style={styles.activeCityScrollElement}>
      <View style={styles.activeCityScrollElement}><Text style={styles.boldText}>Ressenti : {currentFeelsLike} °C</Text></View>
      <View style={styles.activeCityScrollElement}><Text style={styles.boldText}>Minimal : {currentTempMin} °C</Text></View>
      <Text>Maximal : {currentTempMax} °C</Text>
      <Text>Humidité : {activeHumidity}</Text>
      <Text>Pression : {activePressure}</Text>
      </View>
      <View style={styles.activeCityScrollElement}>
      <Text>Nuages : {currentClouds}</Text>
      <Text>Vent : {currentWindDegree}° et {currentWindSpeed}</Text>
      <Text>Lever du soleil : {activeCitySunriseHour}h{activeCitySunriseMinute}</Text>
      <Text>Coucher du soleil : {activeCitySunsetHour}h{activeCitySunsetMinute}</Text>
      </View>
      </ScrollView>
      
        
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
    paddingTop: 40
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50
  },
  title2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  boldText: {
    fontWeight: 'bold'
  },
  image: {
    width: 250,
    height: 250
  },
  image2: {
    width: 150,
    height: 150
  },
  activeTemperature: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 45
  },
  activeCityScrollElement: {
    padding: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


