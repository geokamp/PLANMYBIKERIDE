import L, { polyline } from "leaflet";




export default async function AlternativesRoutes(map, coords){

    console.log(coords);
try{
    let URL = "https://api.mapbox.com/directions/v5/mapbox/driving/";

    if (coords.length >= 2) {
      URL += coords.slice(0, 2).map(coord => coord.join(',')).join(';');
      if (coords.length > 2) {
        URL += ";" + coords.slice(2).map(coord => coord.join(',')).join(';');
      }
    } else {
      URL += coords.map(coord => coord.join(',')).join(';');
    }

    URL += "?alternatives=true&exclude=motorway&geometries=geojson&language=gr&overview=full&steps=true&access_token=pk.eyJ1IjoiZ2Vva2FtcDk4IiwiYSI6ImNscGk4NWowajA3dGUycXJ2OHN0eWZpamIifQ.Ebg7_CPl9D4OoUcKpl4iLg";
    
    const data = await fetch(URL)
        .then((res)=> res.json())
        .then((data)=> data);

        console.log(data);
    
    
    if(data && data.routes && data.routes[0]){
        const route = data.routes[0];
        const result = {
            coordinates: [],
            distance: 0,
            duration: 0,
            steps:[],
            currentDistance: []
          };

          if( route.geometry && Array.isArray(route.geometry.coordinates)){
            result.coordinates = route.geometry.coordinates;
            const order = result.coordinates.map(([lat, lon])=>[lon,lat]);
            const polyline = L.polyline(order, {color: 'red'}).addTo(map);
            if (map.previousRoute) {
              map.removeLayer(map.previousRoute);
            }
             map.previousRoute = polyline;
             map.fitBounds(polyline.getBounds());
             if (route) {
              result.distance = route.distance;
              result.duration = route.duration;
              }
             if(route.legs[0].steps){
              const steps = route.legs[0].steps;
              const instructions = steps.map(step => step.maneuver);
              console.log(instructions);
              result.steps = instructions;
              result.currentDistance = route.legs[0].steps;
             }
        
        
        }
          return result;
        }else{
          throw new Error("No route found. Please adjust your coordinates.");
        }
      }
      catch(error) {
        console.log(error);
      }
    

}