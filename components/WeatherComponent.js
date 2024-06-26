import { StyleSheet, Text, View, Image } from 'react-native';

export const WeatherComponent = (objetMeteo) => {
    const obj = objetMeteo;

    //console.log(objetMeteo.obj);
    //console.log(obj.obj.temperature);
    return (
      <View style={{width: "100%", flexDirection: 'column',flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={{flexDirection: 'column', alignItems: 'center'}} >
          <View>
            <Text style={styles.bigBoldWhiteText}>{objetMeteo.obj.city} - {objetMeteo.obj.description}</Text> 
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Image style={styles.image3} source={{ uri : objetMeteo.obj.icon }} /> 
            <Text style={styles.bigBoldWhiteText}>{objetMeteo.obj.temperature} °C</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center'}} >
          <View style={{width: '50%'}}>
          <Text><Text style={styles.boldText}>Ressenti :</Text><Text> {objetMeteo.obj.feelsLike} °C</Text></Text>
          <Text><Text style={styles.boldText}>Minimal :</Text><Text> {objetMeteo.obj.temperatureMin} °C </Text></Text>
          <Text><Text style={styles.boldText}>Maximal :</Text> <Text>{objetMeteo.obj.temperatureMax} °C</Text></Text>
          <Text><Text style={styles.boldText}>Lever du soleil :</Text> <Text>{objetMeteo.obj.sunriseHour}h{objetMeteo.obj.sunriseMinute}</Text></Text>
          <Text><Text style={styles.boldText}>Coucher du soleil :</Text> <Text>{objetMeteo.obj.sunsetHour}h{objetMeteo.obj.sunsetMinute}</Text></Text>
        </View>
          <View style={{width: '40%'}}>
          <Text><Text style={styles.boldText}>Humidité :</Text> <Text>{objetMeteo.obj.humidity}%</Text></Text>
          <Text><Text style={styles.boldText}>Pression :</Text> <Text>{objetMeteo.obj.pressure} hPa</Text></Text>
          <Text><Text style={styles.boldText}>Nuages :</Text> <Text>{objetMeteo.obj.clouds}%</Text></Text>
          <Text><Text style={styles.boldText}>Vent :</Text> <Text>{objetMeteo.obj.windDegree}° et {objetMeteo.obj.windSpeed}km/h</Text></Text>
          
          </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A3B18A',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40
    },
    title: {
      color: '#13315C',
      fontWeight: 'bold',
      fontSize: 50
    },
    title2: {
      color: '#13315C',
      fontWeight: 'bold',
      fontSize: 20
    },
    boldText: {
      fontWeight: 'bold',
      //color: 'white',
    },
    image: {
      width: 250,
      height: 250
    },
    image2: {
      width: 150,
      height: 150
    },
    image3: {
      width: 100,
      height: 100
    },
    bigBoldWhiteText: {
      color: '#13315C',
      fontWeight: 'bold',
      fontSize: 25
    },
    activeCityScrollElement: {
      padding: 15,
    },
  });
  
  
  