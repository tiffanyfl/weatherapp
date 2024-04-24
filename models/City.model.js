// Le Parent
export class City {
    nom = null;
    lat = null;
    lon = null;
    favoris = null;
    observers = null;

    constructor(nom, lat, lon, favoris) {
        this.nom = nom;
        this.lat = lat;
        this.lon = lon;
        this.favoris = favoris;
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


    setNom(value) {
        this.nom = value;
        return this.nom;
    }

    setLat(value) {
        this.lat = value;
        return this.lat;
    }

    setLon(value) {
        this.lon = value;
        return this.lon;
    }

    setFavoris(value) {
        this.favoris = value;
        this.notify(this.favoris);
        return this.favoris;
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
 