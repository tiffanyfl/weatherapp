import { getCityGPSCoord, getCityWeather } from "../api/openWeather";
import { useState, useEffect } from 'react';

export const DonneesMeteoController = (() => {
    const [locations, setLocations] = useState([]);
    const [meteo, setMeteo] = useState({});
    const [search, onChangeSearch] = useState('');
    const [list, onchangeList] = useState('');
    const [showBar, onChangeShowBar] = useState(false);
    let villeLat;
    let villeLon;
    let testMeteo;
    let villeRecherchee;
    //let villeRecherchee = getCityGPSCoord(search);
    //console.log("VilleRecherchee", villeRecherchee);

    console.log(list); 

    useEffect(() => {
        const timer = setTimeout(() => {
        console.log('Api is called');
        console.log(search);
        villeRecherchee = getCityGPSCoord(search);
        villeRecherchee.then((result) => {
            console.log(result);
            if(list === ''){
            villeLat = result[0].lat;
            villeLon = result[0].lon;
            } else {
            villeLat = result[list].lat;
            villeLon = result[list].lon;
            }
            console.log(villeLat);
            
            setLocations(result);
            console.log(locations);
            getCityWeather(villeLat, villeLon).then((val) => {
            console.log(val);
            
            //setMeteo(testMeteo);
            //setMeteo(val);
            const dateSunrise = new Date(val.sys.sunrise * 1000);
            const dateSunset = new Date(val.sys.sunset * 1000);
            testMeteo = new DonneesMeteo.Builder()
            .setDescription(val.weather[0].description)
            .setTemperatureActuelle(val.main.temp)
            .setTemperatureMin(val.main.temp_min)
            .setTemperatureMax(val.main.temp_max)
            .setRessenti(val.main.feels_like)
            .setHumidite(val.main.humidity)
            .setPression(val.main.pressure)
            .setNuages(val.clouds.all)
            .setIcone(val.weather[0].icon)
            .setVentDegre(val.wind.deg)
            .setVentVitesse(val.wind.speed)
            .setLeverSoleilHeure(dateSunrise.getHours().toString())
            .setLeverSoleilMinute(dateSunrise.getMinutes().toString())
            .setCoucherSoleilHeure(dateSunset.getHours().toString())
            .setCoucherSoleilMinute(dateSunset.getMinutes().toString())
            .build();
    
            setMeteo(testMeteo);
            return val;
            });
        
            return result;
        });
        }, 1200)
        return () => clearTimeout(timer)
    }, [search, list]);


    console.log(locations);
    //console.log(villeRecherchee);
    console.log(meteo);
    //console.log(meteoMain.temp);
    console.log(testMeteo);
});