import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import authService from "../services/AuthService";

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
    
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title='Se connecter' onPress={() => handleLogin()}/>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={{ marginVertical: 10 }} />
      <TouchableOpacity onPress={goToRegisterScreen}>
        <Text style={styles.registerLink}>Pas encore de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  registerLink: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginTop: 10,
  }
});

export default LoginScreen;