import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

class AuthService {
  constructor() {
    if (!AuthService.instance) {
      this.auth = auth;
      this.unsubscribeAuth = null;
      AuthService.instance = this;
    }

    return AuthService.instance;
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async setPseudo(pseudo) {
    try {
      this.pseudo = pseudo;
      console.log(pseudo);
    } catch (error) {
      console.error(error);
    }
  }

  getPseudo() {
    return this.pseudo || 'Utilisateur'; 
  }

  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  onAuthStateChanged(callback) {
    return onAuthStateChanged(this.auth, callback);
  }
}

export default AuthService.getInstance();