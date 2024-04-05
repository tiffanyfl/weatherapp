import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

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

  async setPseudo(uid, pseudo) {
    try {
      await setDoc(doc(db, "users", uid), {
        pseudo: pseudo,
      });
    } catch (error) {
      console.error("error setting pseudo:", error);
      throw error;
    }
  }

  async getPseudo(uid) {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.pseudo;
      } else {
        console.log("user not found");
        return null; 
      }
    } catch (error) {
      throw error;
    }
  }

  async signUp (email, password, pseudo) {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      await setDoc(doc(db, "users", user.uid), {
        pseudo: pseudo,
        email: user.email,
      });
      return user;
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