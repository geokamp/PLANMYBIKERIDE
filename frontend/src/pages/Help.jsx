import React from 'react'
import  './styleHelp.css';



export default function Help() {
  return (
    <div>
      <section className="wrapper">
       <div className="container">
         <div className="grid-cols-2">
           <div className="grid-item-1">
              <h1 className="main-heading">
               Welcome to <span>PlanMyBikeRide</span>
               <br />
              
             </h1>
             <p className="info-text">
             Plan My Bike Ride is a web app where you can plan your trip according to the weather situations or to get a random trip for a boring Sunday! It is very easy to use!
             </p>
           </div>
           <div className="grid-item-2">
             <div className="team_img_wrapper">
               <img src="/photos/help1.png" alt="mainphoto" />
             </div>
           </div>
         </div>
       </div>
     </section>
     <section className="wrapper">
       <div className="container">
         <div className="grid-cols-2">
           <div className="grid-item-1">
              <h1 className="main-heading">
               1.Planning 
               <br />
             </h1>
             <p className="info-text">
             On the right side there are the routing controls where you can add your desire locations, when entering one location you have to press <span>ENTER</span> in order to show the marker to the map.
             </p>
           </div>
           <div className="grid-item-2">
             <div className="team_img_wrapper">
               <img src="/photos/help1.png" alt="mainphoto" />
             </div>
           </div>
         </div>
       </div>
     </section>
     <section className="wrapper">
       <div className="container">
         <div className="grid-cols-2">
           <div className="grid-item-1">
              <h1 className="main-heading">
               2.RoundRoute 
               <br />
             </h1>
             <p className="info-text">
             Here you can get a round trip up to 100km distance, you have to add the date, the length, the points and the seed for your trip before press the round button
             </p>
           </div>
           <div className="grid-item-2">
             <div className="team_img_wrapper">
               <img src="/photos/help1.png" alt="mainphoto" />
             </div>
           </div>
         </div>
       </div>
     </section>
     <section className="wrapper">
       <div className="container">
         <div className="grid-cols-2">
           <div className="grid-item-1">
              <h1 className="main-heading">
               3.SaveYourTrip
               <br />
             </h1>
             <p className="info-text">
             After you have choose, which trip you like the most you can save it to your account, by clicking the save icon!
             </p>
           </div>
           <div className="grid-item-2">
             <div className="team_img_wrapper">
               <img src="/photos/help1.png" alt="mainphoto" />
             </div>
           </div>
         </div>
       </div>
     </section>
     <section className="wrapper">
       <div className="container">
         <div className="grid-cols-2">
           <div className="grid-item-1">
              <h1 className="main-heading">
               4.Download As GPX
               <br />
             </h1>
             <p className="info-text">
             You can download your desire route as gpx to take it in your preferable app!
             </p>
           </div>
           <div className="grid-item-2">
             <div className="team_img_wrapper">
               <img src="/photos/gpx.png" alt="mainphoto" />
             </div>
           </div>
         </div>
       </div>
     </section>
     <section className="wrapper">
       <div className="container">
         <div className="grid-cols-2">
           <div className="grid-item-1">
              <h1 className="main-heading">
               5.Manage your Routes!
               <br />
             </h1>
             <p className="info-text">
             You can edit or delete your routes whenever you want!
             </p>
           </div>
           <div className="grid-item-2">
             <div className="team_img_wrapper">
               <img src="/photos/myroutes.png" alt="mainphoto" />
             </div>
           </div>
         </div>
       </div>
     </section>
    </div>
  )
}
