export class WeatherData  {
    nomVille = null;
    description = null;
    temperatureActuelle = null;
    temperatureMin = null;
    temperatureMax = null;
    ressenti = null;
    humidite = null;
    pression = null;
    nuages = null;
    icone = null;
    ventDegre = null;
    ventVitesse = null;
    leverSoleilHeure = null;
    leverSoleilMinute = null;
    coucherSoleilHeure = null;
    coucherSoleilMinute = null;

    static Builder = class { 
        nomVille = null;
        description = null;
        temperatureActuelle = null;
        temperatureMin = null;
        temperatureMax = null;
        ressenti = null;
        humidite = null;
        pression = null;
        nuages = null;
        icone = null;
        ventDegre = null;
        ventVitesse = null;
        leverSoleilHeure = null;
        leverSoleilMinute = null;
        coucherSoleilHeure = null;
        coucherSoleilMinute = null;

        setNomVille(ville){
            this.nomVille = ville;
            return this;
        }

        setDescription(desc) {
            this.description = desc;
            return this;
        }

        setTemperatureActuelle(temp) {
            this.temperatureActuelle = Math.round(temp);
            return this;
        }
        


        setTemperatureMin(temp) {
            this.temperatureMin = Math.round(temp);
            return this;
        }
        setTemperatureMax(temp) {
            this.temperatureMax = Math.round(temp);
            return this;
        }
        setRessenti(res) {
            this.ressenti = Math.round(res);
            return this;
        }
        setHumidite(hum) {
            this.humidite = Math.round(hum);
            return this;
        }
        setPression(pres) {
            this.pression = Math.round(pres);
            return this;
        }
        setNuages(nua) {
            this.nuages = nua;
            return this;
        }
        setIcone(icon) {
            this.icone = 'https://openweathermap.org/img/wn/' + icon + '@4x.png';
            return this;
        }
        setVentDegre(ventD) {
            this.ventDegre = Math.round(ventD);
            return this;
        }
        setVentVitesse(ventV) {
            this.ventVitesse = Math.round(ventV);
            return this;
        }
        setLeverSoleilHeure(leverSHeure) {
            this.leverSoleilHeure = leverSHeure;
            return this;
        }
        setLeverSoleilMinute(leverSMinute) {
            this.leverSoleilMinute = leverSMinute;
            return this;
        }
        setCoucherSoleilHeure(coucherSHeure) {
            this.coucherSoleilHeure = coucherSHeure;
            return this;
        }
        setCoucherSoleilMinute(coucherSMinute) {
            this.coucherSoleilMinute = coucherSMinute;
            return this;
        }
        build() {
            const weatherData = new WeatherData(
                this.nomVille,
                this.description,
                this.temperatureActuelle,
                this.temperatureMin,
                this.temperatureMax,
                this.ressenti,
                this.humidite,
                this.pression,
                this.nuages,
                this.icone,
                this.ventDegre,
                this.ventVitesse,
                this.leverSoleilHeure,
                this.leverSoleilMinute,
                this.coucherSoleilHeure,
                this.coucherSoleilMinute,
            )
            return weatherData;

        }
    }

    constructor(nom, description, temperatureActuelle, temperatureMin, temperatureMax, ressenti, humidite, pression, nuages, icone, ventDegre, ventVitesse, leverSoleilHeure, leverSoleilMinute, coucherSoleilHeure, coucherSoleilMinute) {
        this.nomVille = nom;
        this.description = description;
        this.temperatureActuelle = temperatureActuelle;
        this.temperatureMin = temperatureMin;
        this.temperatureMax = temperatureMax;
        this.ressenti = ressenti;
        this.humidite = humidite;
        this.pression = pression;
        this.nuages = nuages;
        this.icone = icone;
        this.ventDegre = ventDegre;
        this.ventVitesse = ventVitesse;
        this.leverSoleilHeure = leverSoleilHeure;
        this.leverSoleilMinute = leverSoleilMinute;
        this.coucherSoleilHeure = coucherSoleilHeure;
        this.coucherSoleilMinute = coucherSoleilMinute;
      }
        
      /*setTemperatureActuelle(temp){
        this.temperatureActuelle = temp;
        return this;
      }*/

      /*build(){
        return this.result;
      }*/

      getTemperatureActuelle(){
        return this.temperatureActuelle;
    }

    getAll(){
        return this;
    }

      toString() {
        return `nomVille: ${this.nom}
            description: ${this.description}
            temperatureActuelle: ${this.temperatureActuelle}
            temperatureMin: ${this.temperatureMin}
            temperatureMax: ${this.temperatureMax}
            ressenti: ${this.ressenti}
            humidite: ${this.humidite}
            pression: ${this.pression}
            nuages: ${this.nuages}
            icone: ${this.icone}
            ventDegre: ${this.ventDegre}
            ventVitesse: ${this.ventVitesse}
            leverSoleilHeure: ${this.leverSoleilHeure}
            leverSoleilMinute: ${this.leverSoleilMinute}
            coucherSoleilHeure: ${this.coucherSoleilHeure}
            coucherSoleilMinute: ${this.coucherSoleilMinute}`;
    }

          
    
}


