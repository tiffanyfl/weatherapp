import { doc, getDoc, setDoc } from "firebase/firestore";
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