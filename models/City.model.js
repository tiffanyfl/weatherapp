// Le Parent
export class City {
    nom = '';
    lat = 0;
    lon = 0;
    favorite = false;
    observers = [];

    constructor(name, lat, lon, favorite) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        this.favorite = favorite;
        this.observers = []
    }

    subscribe(observer){
        this.observers.push(observer);
    }

    unsubscribe(observer){
        this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.addToFavorite(data));
    }


    setName(value) {
        this.name = value;
        return this.name;
    }

    setLat(value) {
        this.lat = value;
        return this.lat;
    }

    setLon(value) {
        this.lon = value;
        return this.lon;
    }

    setFavorite(value) {
        this.favorite = value;
        this.notify(this.favorite);
        return this.favorite;
    }

    

    
 /*
    get lat() {
        return this.lat;
    }
    get lon() {
        return this.lat;
    }
    get favoris() {
        return this.favoris;
    }*/
 }
 