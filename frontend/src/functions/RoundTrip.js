import Openrouteservice from 'openrouteservice-js';
import L, { polyline } from "leaflet";
import dotenv from 'dotenv';
import React, {useState} from "react";

export default async function RoundTrip(map, coords, length, points, seed){

    const apiKey = process.env.ORS;
    
    //console.log(start);
  

    const orsDirections = new Openrouteservice.Directions({
        api_key: apiKey
      });

      


      const response = await orsDirections.calculate({
      coordinates: coords,
      profile: "driving-car",
      extra_info: ["waytype", "steepness"],
      options: {avoid_features :["highways"],
                round_trip: {length: length,  points :points, seed:seed}},
      format: "geojson",
      api_version: 'v2',
    })
console.log(response);
      if (response && response.features && response.features[0]) {
        const feature = response.features[0];
        const result = {
          coordinates: [],
          distance: 0,
          duration: 0,
          steps:[],
          currentDistance: []
        };
          if (feature.geometry && Array.isArray(feature.geometry.coordinates)) {
            result.coordinates = feature.geometry.coordinates;
            const order = result.coordinates.map(([lat, lon])=>[lon,lat]);
            const polyline = L.polyline(order, {color: 'red'}).addTo(map);
            if (map.previousRoute) {
              map.removeLayer(map.previousRoute);
            }
             map.previousRoute = polyline;
            map.fitBounds(polyline.getBounds());
            if (feature.properties.summary) {
              result.distance = feature.properties.summary.distance;
              result.duration = feature.properties.summary.duration;
              if (feature.properties.segments && feature.properties.segments[0].steps) {
                result.steps = feature.properties.segments[0].steps;
                result.currentDistance = feature.properties.segments[0].steps;
              }
            }
            
        }
        return result;
        
            }
    
    return [];
     
}