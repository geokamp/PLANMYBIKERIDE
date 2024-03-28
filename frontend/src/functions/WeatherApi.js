export default async function WeatherApi(start, stDate, enDate){

    console.log(start);
    const lat = start.map(lats => lats[1]);
    const lon = start.map(lons => lons[0]);

    
 try{  
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,weather_code,visibility,wind_speed_10m,wind_direction_10m&timezone=auto&start_date=${stDate}&end_date=${enDate}`;
    const data = await fetch(URL)
        .then((res)=> res.json())
        .then((data)=> data);

        console.log(data);
        const results = [];
        if (Array.isArray(data)) {  
          for (const location of data) {
          if (location.hourly) {
              const result = {
              temperature: location.hourly.temperature_2m,
              visibility: location.hourly.visibility,
              time: location.hourly.time,
              rain: location.hourly.rain,
              weather_code: location.hourly.weather_code,
              wind_speed: location.hourly.wind_speed_10m,
              wind_direction: location.hourly.wind_direction_10m
        };

      results.push(result);
    }
  }
        }else{
          if (data.hourly) {
            const result = {
                temperature: data.hourly.temperature_2m,
                visibility: data.hourly.visibility,
                time: data.hourly.time,
                rain: data.hourly.rain,
                weather_code: data.hourly.weather_code,
                wind_speed: data.hourly.wind_speed_10m,
                wind_direction: data.hourly.wind_direction_10m
            };
            results.push(result);
        }
        }
  return results;
      }catch
        (error) {
          console.log(error);
          alert(error.message);
      }
        
    } 
   