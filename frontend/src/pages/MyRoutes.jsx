import React from 'react'
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import Trips from '../../../backend/models/trips.model';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';





export default function MyRoutes() {

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [userTrips, setUserTrips] = useState([]);
  const [showtripsError, setShowTripsError] = useState(false);



  const handleShowTrips = async () => {
    try {
      setShowTripsError(false);
      const res = await fetch(`/backend/user/trips/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowTripsError(true);
        return;
      }

      setUserTrips(data);
    } catch (error) {
      setShowTripsError(true);
    }
  };

  const handleTripsDelete = async (tripsId) => {
    try {
      const res = await fetch(`/backend/trips/delete/${tripsId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserTrips((prev) =>
        prev.filter((trips) => trips._id !== tripsId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };





  return (
    <div style={{ position: "absolute", left: "35%", top: "10%" }}>
    <h1>My Routes</h1>
    <Button
    onClick={handleShowTrips}   
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0 ,bgcolor: '#3f448e' }}
            >show</Button>
    {userTrips &&
      userTrips.length > 0 &&
      userTrips.map((trip) => (
        <div key={trip._id} style={{ textAlign:"center", borderBottomStyle: "solid", borderWidth:"1px", padding:"13px", marginTop:"4px"}}>
            <div style={{display:"flex",justifyContent: "space-between", padding:"6px"}}>
              <h4 style={{textTransform: "uppercase", marginRight:"20px"}}>START: {trip.start}</h4>
              <h4 style={{textTransform: "uppercase", marginRight:"20px"}}>END: {trip.destination}</h4>
              <h4 style={{textTransform: "uppercase", marginRight:"20px"}}>Distance: {trip.distance} km</h4>
              <h4 style={{textTransform: "uppercase", marginRight:"20px"}}>Duration:{trip.duration}</h4>
           </div>
           <div style={{display:"inline-block"}}>
            <Button variant="contained" sx={{bgcolor:"red",  marginRight:"5px"}} onClick={() => handleTripsDelete(trip._id)}>
              Delete
            </Button>
            <Link to={`/update/${trip._id}`}>
              <Button variant="contained" sx={{bgcolor:"green"}}>
                Edit
              </Button>
            </Link>
           </div>
        </div>
      ))}
  </div>

  )
}
