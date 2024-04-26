export class WeatherData  {
    city = null;
    description = null;
    temperature = null;
    temperatureMin = null;
    temperatureMax = null;
    feelsLike = null;
    humidity = null;
    pressure = null;
    clouds = null;
    icon = null;
    windDegree = null;
    windSpeed = null;
    sunriseHour = null;
    sunriseMinute = null;
    sunsetHour = null;
    sunsetMinute = null;

    static Builder = class { 
        city = null;
        description = null;
        temperature = null;
        temperatureMin = null;
        temperatureMax = null;
        feelsLike = null;
        humidity = null;
        pressure = null;
        clouds = null;
        icon = null;
        windDegree = null;
        windSpeed = null;
        sunriseHour = null;
        sunriseMinute = null;
        sunsetHour = null;
        sunsetMinute = null;

        setCity(city){
            this.city = city;
            return this;
        }

        setDescription(desc) {
            this.description = desc;
            return this;
        }

        setTemperature(temp) {
            this.temperature = Math.round(temp);
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
        setFeelsLike(res) {
            this.feelsLike = Math.round(res);
            return this;
        }
        setHumidity(hum) {
            this.humidity = Math.round(hum);
            return this;
        }
        setPressure(pres) {
            this.pressure = Math.round(pres);
            return this;
        }
        setClouds(nua) {
            this.clouds = nua;
            return this;
        }
        setIcon(icon) {
            this.icon = 'https://openweathermap.org/img/wn/' + icon + '@4x.png';
            return this;
        }
        setWindDegree(ventD) {
            this.windDegree = Math.round(ventD);
            return this;
        }
        setWindSpeed(ventV) {
            this.windSpeed = Math.round(ventV);
            return this;
        }
        setSunriseHour(leverSHeure) {
            this.sunriseHour = leverSHeure;
            return this;
        }
        setSunriseMinute(leverSMinute) {
            this.sunriseMinute = leverSMinute;
            return this;
        }
        setSunsetHour(coucherSHeure) {
            this.sunsetHour = coucherSHeure;
            return this;
        }
        setSunsetMinute(coucherSMinute) {
            this.sunsetMinute = coucherSMinute;
            return this;
        }
        build() {
            const weatherData = new WeatherData(
                this.city,
                this.description,
                this.temperature,
                this.temperatureMin,
                this.temperatureMax,
                this.feelsLike,
                this.humidity,
                this.pressure,
                this.clouds,
                this.icon,
                this.windDegree,
                this.windSpeed,
                this.sunriseHour,
                this.sunriseMinute,
                this.sunsetHour,
                this.sunsetMinute,
            )
            return weatherData;

        }
    }

    constructor(city, description, temperature, temperatureMin, temperatureMax, feelsLike, humidity, pressure, clouds, icon, windDegree, windSpeed, sunriseHour, sunriseMinute, sunsetHour, sunsetMinute) {
        this.city = city;
        this.description = description;
        this.temperature = temperature;
        this.temperatureMin = temperatureMin;
        this.temperatureMax = temperatureMax;
        this.feelsLike = feelsLike;
        this.humidity = humidity;
        this.pressure = pressure;
        this.clouds = clouds;
        this.icon = icon;
        this.windDegree = windDegree;
        this.windSpeed = windSpeed;
        this.sunriseHour = sunriseHour;
        this.sunriseMinute = sunriseMinute;
        this.sunsetHour = sunsetHour;
        this.sunsetMinute = sunsetMinute;
      }
        
      /*setTemperatureActuelle(temp){
        this.temperatureActuelle = temp;
        return this;
      }*/

      /*build(){
        return this.result;
      }*/

      /*getTemperature(){
        return this.temperature;
    }*/

    getAll(){
        return this;
    }

      toString() {
        return `city: ${this.city}
            description: ${this.description}
            temperature: ${this.temperature}
            temperatureMin: ${this.temperatureMin}
            temperatureMax: ${this.temperatureMax}
            feelsLike: ${this.feelsLike}
            humidity: ${this.humidity}
            pressure: ${this.pressure}
            clouds: ${this.clouds}
            icon: ${this.icon}
            windDegree: ${this.windDegree}
            windSpeed: ${this.windSpeed}
            sunriseHour: ${this.sunriseHour}
            sunriseMinute: ${this.sunriseMinute}
            sunsetHour: ${this.sunsetHour}
            sunsetMinute: ${this.sunsetMinute}`;
    }

          
    
}


