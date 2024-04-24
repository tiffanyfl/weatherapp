import { City } from "./City.model";
import { useState, useEffect } from 'react';

export class FavoriteCities {
    favoriteCitiesArray = [];
    
    constructor(favoriteCitiesArray) {
        this.favoriteCitiesArray = favoriteCitiesArray;
    }

    setFavoriteCitiesArray(value) {
        this.favoriteCitiesArray.push(value);
        return this.favoriteCitiesArray;
    }

    getFavoriteCitiesArray() {
        return this.favoriteCitiesArray;
    }

    addToFavorite(cityName){
        console.log(cityName + " added to favorite");
    }

    
}