const apiKey = '6c8f30fee7b427293f0eeb0761a188a5';


export async function getCityGPSCoord(city) {

    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&lang=fr&appid=${apiKey}`);
      const json = await response.json();
      //console.log(city);
      //console.log(apiKey);
      //console.log(json[0]);
      //getCityWeather(json[0].lat, json[0].lon);
      return json;
      //return getCityWeather(json[0].lat, json[0].lon);
    } catch (error) {
      console.error(error);
    }
};

export async function getCityWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`);
        const json = await response.json();
        //console.log(json);
        //console.log(json.main);
        return json;
    } catch(error) {
        console.log(error);
    }
}