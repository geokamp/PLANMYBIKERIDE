import React from 'react'
import  './styleHome.css';
import DirectionsIcon from '@mui/icons-material/Directions';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DownloadIcon from '@mui/icons-material/Download';
import { Link, useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function Home(props) {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();


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
             Plan your ride, check the Weather Situations or just Get a Random Round Ride!
             </p>
    {currentUser ? (<div className="btn_wrapper">
              <Link to="/MAP">
                <button className="btn view_more_btn">
                  Get Started <i className="ri-arrow-right-line"></i>
                </button>
               </Link>
               <Link to="/HELP">
               <button className="btn documentation_btn">documentation</button>
               </Link>
             </div>) : (<div className="btn_wrapper">
              <Link to="/SignUp">
                <button className="btn view_more_btn">
                  Get Started <i className="ri-arrow-right-line"></i>
                </button>
               </Link>
               <Link to="/HELP">
               <button className="btn documentation_btn">documentation</button>
               </Link>
             </div>)}
             
           </div>
           <div className="grid-item-2">
             <div className="team_img_wrapper">
               <img src="/photos/backphoto.jpg" alt="mainphoto" />
             </div>
           </div>
         </div>
       </div>
     </section>
 
     <section className="wrapper">
       <div className="container" data-aos="fade-up" data-aos-duration="1000">
         <div className="grid-cols-3">
           <div className="grid-col-item">
             <div className="icon">
               <DirectionsIcon/>
             </div>
             <div className="featured_info">
               <span>Directions </span>
               <p>
                 Get Directions for your destinations and navigate to them!
               </p>
             </div>
           </div>
           <div className="grid-col-item">
             <div className="icon">
               <WbSunnyIcon/>
             </div>
             <div className="featured_info">
               <span>Weather Information</span>
               <p>
                 Check Weather Situations before start your ride!
               </p>
             </div>
           </div>
 
           <div className="grid-col-item">
             <div className="icon">
               <DownloadIcon/>
             </div>
             <div className="featured_info">
               <span>Plan and Go</span>
               <p>
                 You can plan your route and Download it to GPX to take it with you to your desire app!
               </p>
             </div>
           </div>
         </div>
       </div>
     </section>
 
     <footer>
       
     </footer>
    </div>
  )
}