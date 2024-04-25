import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Pressable, FlatList, Button } from 'react-native';
//import { getCityGPSCoord, getCityWeather } from "./api/openWeather";
//import { DonneesMeteo } from "./models/DonneesMeteo";
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen";
import FavoriteScreen from './screens/FavoriteScreen';
import WeatherAlertPage from './screens/WeatherAlertPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: true }}
              listeners={({ navigation }) => ({
                beforeRemove: () => {
                  if (!loggedIn) {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'LoginScreen' }],
                    });
                  }
                },
              })}
          />
          <Tab.Screen name="Favorite" component={FavoriteScreen} />
          <Tab.Screen name="Alert" component={WeatherAlertPage} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
