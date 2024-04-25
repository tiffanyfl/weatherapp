import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs, deleteField, updateDoc, FieldValue, arrayRemove  } from "firebase/firestore";
import {db} from "./firebase";

export const storeFavoriteCity = async(userId, cities) => {
    try {
        //console.log(userId + " " + cities);
        //console.log(cities);
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
            //console.log(favoriteCityDoc.data());
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
        
        /*const querySnapshot = await getDocs(collection(db, "favoriteCities", userId, 'cities'));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        });*/
        //const cityRef = db.collection('favoritesCities').doc(userId);
        const cityRef = doc(db, 'favoriteCities', userId);
        await updateDoc(cityRef, {
            //index: deleteField();
            cities: arrayRemove(city),
        });
        //await deleteDoc(doc(db, "favoriteCities", userId));
    } catch(error){
        console.log(error);
        throw error;
    }
}