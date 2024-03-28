import React from "react";
import Openrouteservice from 'openrouteservice-js';



export default async function Geolocate(location){

    const apiKey = "5b3ce3597851110001cf62484b6b5cdd3e324e45800d330a5218dccc";



    const Geocode = new Openrouteservice.Geocode({
        api_key: apiKey,
      });
  
      const result = await Geocode.geocode({
        text: location,
      });
      if (
        result && result.features && result.features[0] && result.features[0].geometry
          && result.features[0].geometry.coordinates
      ) {
        const [longitude, latitude] = result.features[0].geometry.coordinates;
        return  [longitude, latitude] ;
      }
    
      return null;
}