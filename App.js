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

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
