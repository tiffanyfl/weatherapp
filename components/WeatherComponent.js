import { StyleSheet, Text, View, TextInput, TouchableHighlight, Pressable, FlatList, ScrollView, Image, Button } from 'react-native';
import { useState, useEffect } from 'react'

export const WeatherComponent = (objetMeteo) => {
    const obj = objetMeteo;

    //console.log(objetMeteo.obj);
    //console.log(obj.obj.temperatureActuelle);
    return (
      <View style={{width: "100%", flexDirection: 'column',flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={{flexDirection: 'column', alignItems: 'center'}} >
          <View>
            <Text style={styles.bigBoldWhiteText}>{objetMeteo.obj.nomVille} - {objetMeteo.obj.description}</Text> 
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Image style={styles.image3} source={{ uri : objetMeteo.obj.icone }} /> 
            <Text style={styles.bigBoldWhiteText}>{objetMeteo.obj.temperatureActuelle} °C</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center'}} >
          <View style={{width: '50%'}}>
          <Text><Text style={styles.boldText}>Ressenti :</Text><Text> {objetMeteo.obj.ressenti} °C</Text></Text>
          <Text><Text style={styles.boldText}>Minimal :</Text><Text> {objetMeteo.obj.temperatureMin} °C </Text></Text>
          <Text><Text style={styles.boldText}>Maximal :</Text> <Text>{objetMeteo.obj.temperatureMax} °C</Text></Text>
          <Text><Text style={styles.boldText}>Lever du soleil :</Text> <Text>{objetMeteo.obj.leverSoleilHeure}h{objetMeteo.obj.leverSoleilMinute}</Text></Text>
          <Text><Text style={styles.boldText}>Coucher du soleil :</Text> <Text>{objetMeteo.obj.coucherSoleilHeure}h{objetMeteo.obj.coucherSoleilMinute}</Text></Text>
        </View>
          <View style={{width: '40%'}}>
          <Text><Text style={styles.boldText}>Humidité :</Text> <Text>{objetMeteo.obj.humidite}%</Text></Text>
          <Text><Text style={styles.boldText}>Pression :</Text> <Text>{objetMeteo.obj.pression} hPa</Text></Text>
          <Text><Text style={styles.boldText}>Nuages :</Text> <Text>{objetMeteo.obj.nuages}%</Text></Text>
          <Text><Text style={styles.boldText}>Vent :</Text> <Text>{objetMeteo.obj.ventDegre}° et {objetMeteo.obj.ventVitesse}km/h</Text></Text>
          
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
  
  
  