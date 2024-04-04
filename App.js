<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import RegisterScreen from './screens/RegisterScreen';
import Homescreen from './screens/Homescreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Pressable, FlatList, Button } from 'react-native';
//import { getCityGPSCoord, getCityWeather } from "./api/openWeather";
//import { DonneesMeteo } from "./models/DonneesMeteo";
import { useState, useEffect } from 'react';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from "./screens/HomeScreen";
import { FavoriteScreen } from "./screens/FavoriteScreen";

const Stack = createBottomTabNavigator();
>>>>>>> refs/remotes/origin/main

  return (
    <NavigationContainer>
      <Stack.Navigator>
<<<<<<< HEAD
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="Homescreen"
          component={Homescreen}
          options={{ headerShown: false }}
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
=======
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
>>>>>>> refs/remotes/origin/main
      </Stack.Navigator>
    </NavigationContainer>
  );
}

<<<<<<< HEAD
export default App;
=======
>>>>>>> refs/remotes/origin/main
