import { View, Text, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import authService from "../services/AuthService";
import logo from "../assets/logo.png";
import { general, criteres } from '../css/styles';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError(''); 
      await authService.signIn(email, password);
      navigation.navigate('HomeScreen'); 
    } catch (error) {
      setError(error.message); 
    }
  };

  const goToRegisterScreen = () => {
    navigation.replace('RegisterScreen');
  }

  return (
    <View style={general.backg}>
      <View style={general.container}>
        <Image source={logo} style={general.logo} /> 
        <Text style={general.title}>WeatherGuard</Text>
        <Text style={{marginBottom:10}}>Connexion</Text>
        <TextInput
          style={general.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={general.input}
          placeholder="Mot de passe"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button title='Se connecter' onPress={() => handleLogin()}/>
        <View style={{ marginVertical: 10 }} />
        <TouchableOpacity onPress={goToRegisterScreen}>
          <Text style={criteres.redirectLink}>Pas encore de compte ? S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;