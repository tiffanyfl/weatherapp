import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs, deleteField, updateDoc, FieldValue, arrayRemove  } from "firebase/firestore";
import {db} from "./firebase";

export const storeFavoriteCity = async(userId, cities) => {
    try {
        await setDoc(doc(db, "favoriteCities", userId), {
            cities,
     });
    } catch(error){
        console.log(error);
        throw error;
    }
};

export const getFavoriteCity = async(userId) => {
    try {
        const favoriteCityDoc = await getDoc(doc(db, 'favoriteCities', userId));
        if(favoriteCityDoc.exists()){
            return favoriteCityDoc.data().cities;
        } else {
            console.log("problem");
            return null;
        }
    } catch(error){
        console.log(error);
        throw error;
    }
};

export const deleteFavoriteCity = async(userId, city, index) => {
    try {
        const cityRef = doc(db, 'favoriteCities', userId);
        await updateDoc(cityRef, {
            cities: arrayRemove(city),
        });
    } catch(error){
        console.log(error);
        throw error;
    }
}