// Le Parent
export class Ville {
    nom = null;
    lat = null;
    lon = null;
    favoris = false;

    constructor(nom, lat, lon, favoris) {
        this.nom = nom;
        this.lat = lat;
        this.lon = lon;
        this.favoris = favoris;
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
 