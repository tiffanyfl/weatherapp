import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import authService from "../services/AuthService";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function RegisterScreen() {
  const navigation = useNavigation();

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false
  });

  const creerUnCompte = async () => {
    try {
      setError(null);
      if (password === confirmPassword) {
        if (Object.values(passwordCriteria).every(criteria => criteria === true)) {
          await authService.signUp(email, password);
          await authService.setPseudo(pseudo);
          navigation.replace('Homescreen');
          alert("Compte créé avec succès!");
        } else {
          setError("Le mot de passe ne respecte pas tous les critères.");
        }
      } else {
        setError("Les mots de passe ne correspondent pas");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("L'adresse e-mail est déjà utilisée par un autre compte.");
          break;
        case "auth/invalid-email":
          setError("L'adresse e-mail est invalide.");
          break;
        case "auth/weak-password":
          setError("Le mot de passe est trop faible.");
          break;
        default:
          console.error("Erreur lors de la création du compte :", error.code, error.message);
          setError("Problème lors de la création du compte : " + error.message);
          break;
      }
    }
    
  }
  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordCriteria(prevState => ({ ...prevState, minLength: text.length >= 8 }));
    setPasswordCriteria(prevState => ({ ...prevState, hasUpperCase: /[A-Z]/.test(text) }));
    setPasswordCriteria(prevState => ({ ...prevState, hasLowerCase: /[a-z]/.test(text) }));
    setPasswordCriteria(prevState => ({ ...prevState, hasNumber: /\d/.test(text) }));
  }

  const goToLoginScreen = async () => {
    try {
      await authService.signOut(); 
      navigation.replace('LoginScreen'); 
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>S'inscrire</Text>
      <Text style={styles.error}>{error}</Text>
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        onChangeText={(text) => setPseudo(text)}
        value={pseudo}
      />
      <Text style={styles.error}>{error}</Text>
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
        onChangeText={handlePasswordChange}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer mot de passe"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <View style={styles.criteriaContainer}>
        <View style={styles.criteriaItem}>
          {passwordCriteria.minLength ? <Icon name="check-circle" color="green" size={20} /> : <Icon name="circle" color="gray" size={20} />}
          <Text>  Minimum 8 caractères</Text>
        </View>
        <View style={styles.criteriaItem}>
          {passwordCriteria.hasUpperCase ? <Icon name="check-circle" color="green" size={20} /> : <Icon name="circle" color="gray" size={20} />}
          <Text>  Au moins une majuscule</Text>
        </View>
        <View style={styles.criteriaItem}>
          {passwordCriteria.hasLowerCase ? <Icon name="check-circle" color="green" size={20} /> : <Icon name="circle" color="gray" size={20} />}
          <Text>  Au moins une miniscule</Text>
        </View>
        <View style={styles.criteriaItem}>
          {passwordCriteria.hasNumber ? <Icon name="check-circle" color="green" size={20} /> : <Icon name="circle" color="gray" size={20} />}
          <Text>  Au moins un chiffre</Text>
        </View>
        <View style={styles.criteriaItem}>
          {confirmPassword&&password===confirmPassword ? <Icon name="check-circle" color="green" size={20} /> : <Icon name="circle" color="gray" size={20} />}
          <Text>  Les mots de passe correspondent</Text>
        </View>
      </View>
      <Button
        title="Créer un compte"
        onPress={creerUnCompte}
        disabled={!email || !password || !confirmPassword}
      />
      <TouchableOpacity onPress={goToLoginScreen}>
        <Text style={styles.loginLink}>Déjà un compte ? Se connecter</Text>
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
  input: {
    width: 300,
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  criteriaContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loginLink: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  }
});

export default RegisterScreen;