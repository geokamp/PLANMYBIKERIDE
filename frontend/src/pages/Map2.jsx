import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer} from 'react-leaflet';
import './map2.css';
import EditTrip from '../components/EditTrip';
import { useNavigate, useParams } from 'react-router-dom';


export default function Map() {

 


  return (

      <>
      
        
          <MapContainer center={[21.917925113119136, 17.12665928858075]} zoom={3} scrollWheelZoom={true} zoomControl= {false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=cc66a61ec0de4760be46730c852b8ccc"
            />
            <EditTrip />
            
          </MapContainer>
            
            
          
             
          </>   
      
  )
}
