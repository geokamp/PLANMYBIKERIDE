import React, { useEffect, useState} from "react";
import L from "leaflet";
import { useMap} from "react-leaflet";
import TextField from '@mui/material/TextField';
import Geolocate from "../functions/Geolocate";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import WeatherApi from '../functions/WeatherApi';
import OpenRoute from "../functions/OpenRoute";
import RoundTrip from "../functions/RoundTrip";
import DirectionsIcon from '@mui/icons-material/Directions';
import moment from "moment";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlternativesRoutes from "../functions/AlternativesRoutes";
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DateField} from '@mui/x-date-pickers';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';

const icon = new L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "../../public/photos/marker.png",
  
});




const EditTrip = (props) => {
    const map = useMap();
    const { currentUser } = useSelector((state) => state.user);
    const params = useParams();
    const [formData, setFormData] = useState({
      waypoints: [],
      duration: "",
      distance: "",
      startDate: "",
      endDate: ""
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [distance, setDisatnce]= useState("0");
    const [duration, setDuration]= useState("0");
    const [coords, setCoords] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [end, setEnd] = useState([]);
    const [steps, setSteps] = useState([]);
    const [starterMarker, setStarterMarker] = useState([]);
    const [endMarker, setEndMarker] = useState();
    const [temp, setTemp]= useState([]);
    const [codec, setCodec] = useState([]);
    const [time, setTime] = useState([]);
    const [temp2, setTemp2]= useState([]);
    const [codec2, setCodec2] = useState([]);
    const [visib, setVisib] = useState([]);
    const [visib2, setVisib2] = useState([]);
    const [windspeed, setWindSpeed] = useState([]);
    const [windspeed2, setWindSpeed2] = useState([]);
    const [winddirection, setWindDirection] = useState([]);
    const [winddirection2, setWindDirection2] = useState([]);
    const [rain, setRain] = useState([]);
    const [rain2, setRain2] = useState([]);
    const zoomInControl = L.control.zoom({ position: 'bottomleft' });
    const [expanded, setExpanded] = useState(false);
    const [length, setLength] = useState('');
    const [points, setPoints] = useState('');
    const [seed, setSeed] = useState('');
    const [isTextFieldRequired, setIsTextFieldRequired] = useState(false);
    const [route, setRoute] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [value, setValue] = useState(null);
    const [evalue, setEValue] = useState(null);
    const [open, setOpen] = useState(true);
    const images={
      0:'../../public/photos/sun.png',
      1:'../../public/photos/clear-sky.png',
      2:'../../public/photos/clear-sky.png',
      3:'../../public/photos/clear-sky.png',
      45:'../../public/photos/haze.png',
      48:'../../public/photos/haze.png',
      51:'../../public/photos/drizzle.png',
      56:'../../public/photos/freezing-rain',
      57:'../../public/photos/freezing-rain',
      61:'../../public/photos/light-rain.png',
      63:'../../public/photos/rain.png',
      65:'../../public/photos/storm.png',
      66:'../../public/photos/freezing-rain',
      67:'../../public/photos/freezing-rain',
      71:'../../public/photos/light-snowfall.png',
      73:'../../public/photos/snowfall.png',
      75:'../../public/photos/snowfall.png',
      77:'../../public/photos/snowfall.png',
      80:'../../public/photos/rain.png',
      81:'../../public/photos/rain.png',
      82:'../../public/photos/rain.png',
      83:'../../public/photos/snowfall.png',
      85:'../../public/photos/snowfall.png',
      95: '../../public/photos/rain.png',
      96:'../../public/photos/rain.png',
      99:'../../public/photos/rain.png'
    };
    const [gpsOpen, setGpsOpen] = useState(false);
    const { window } = props;
    const toggleDrawer = (newOpen) => () => {
      setGpsOpen(newOpen);
  
    };

    const container = window !== undefined ? () => window().document.body : undefined;
    const [isFormValid, setIsFormValid] = useState(false);
    const [index, setIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [currentDistance, setCurrentDistance] = useState([])
    const [inputFields, setInputFields] = useState([{id: uuidv4(), location:''}]);

    const [processedLocations, setProcessedLocations] = useState([]);
  
 
    
    
 
      

    useEffect(()=>{
      const fetchTrip = async () => {
        const tripId = params.tripId;
        const res = await fetch(`/backend/trips/get/${tripId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setFormData(data);
      };

      fetchTrip();
    }, [])
      
      
     console.log(formData);

  const updateFormState = () => {
    
    const { waypoints, startDate, endDate, lenght, seed, points} = formData;
  
    // Update inputFields with waypoints
    setInputFields( 
      waypoints.map((waypoint) => ({
        id: uuidv4(),
        location: waypoint
      }))
    );
    

    
    setValue(prevValue => {
      const parsedDay = dayjs(startDate, 'YYYY-MM-DD');
      return parsedDay;
    });

    setEValue(prevEValue => {
      const parsedEday = dayjs(endDate, 'YYYY-MM-DD');
      return parsedEday;
    });

    setLength(lenght);
    setSeed(seed);
    setPoints(points);

    handleClose();
    
    
  };
  



          

    const handleSubmit = (e) => {
      e.preventDefault();
      
    };

    const handleChangeInput = (id, event) => {
      const newInputFields = inputFields.map(i => {
        if(id === i.id) {
          i[event.target.name] = event.target.value
        }
        return i;
      })
      
      setInputFields(newInputFields);

      const location = inputFields.map(field => field.location);

      setFormData(prevData => ({
        ...prevData,
        waypoints: location
      }));

    };


    const handleAddFields = () => {
      setInputFields([...inputFields, {id: uuidv4(),  location: '' }])
    };



    const handleRemoveFields = id => {
      const values  = [...inputFields];
      values.splice(values.findIndex(value => value.id === id), 1);
      setInputFields(values);
      
      
    };

    const handleAll=(id, e)=>{
      handleChangeInput(id, e);
      handleSubmit(e);
      
    };


    const handleKeyDown = (event, location) => {
      if (event.key === "Enter" && !processedLocations.includes(location)) {
        handleGeocode(location);
        setProcessedLocations(prevLocations => [...prevLocations, location]);
      }
    };


    const handleSave = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/backend/trips/update/${params.tripId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
        }
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    

    const convertDistance = (distance) => {
     const converted = (distance / 1000).toFixed(2);
     return converted;
    };


    const convertDuration = (duration) => {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      return `${hours}h ${minutes}m `;
    };

   

    const handleGeocode = async (loc) => {
        const latlon = await Geolocate(loc);
        const reversed = [latlon[1], latlon[0]];
        setCoords([...coords, latlon]);
        const myMarker = L.marker(reversed, { icon: icon }).addTo(map);
        setStarterMarker([...starterMarker, myMarker]);
        const markerPos = myMarker.getLatLng();
        map.setView(markerPos, map.getZoom());
        return reversed;
      
    };
    
    console.log("InputFields", inputFields);
    const fetchData = async () => {
    try{
      const data = await WeatherApi(coords, value, evalue);
      console.log(data);

      if(data.length === 1){
       setTemp(data[0].temperature);
       setCodec(data[0].weather_code);
       setVisib(data[0].visibility);
       setWindSpeed(data[0].wind_speed);
       setWindDirection(data[0].wind_direction);
       setRain(data[0].rain);
       setTime(data[0].time);
      }
      else{
      setTemp(data[0].temperature);
       setCodec(data[0].weather_code);
       setVisib(data[0].visibility);
       setWindSpeed(data[0].wind_speed);
       setWindDirection(data[0].wind_direction);
       setRain(data[0].rain);
       setTime(data[0].time);
       setTemp2(data[1].temperature);
       setCodec2(data[1].weather_code);
       setVisib2(data[1].visibility);
       setWindSpeed2(data[1].wind_speed);
       setWindDirection2(data[1].wind_direction);
       setRain2(data[1].rain);
      }
    }catch (error) {
      // Log the error
      console.log("An error occurred:", error);
      // Throw the error again to propagate it up
      throw error;
    }
    };



    const getRoute =  async ()=> {
     try{
      const newRoute =  await OpenRoute(map, coords);
      console.log(newRoute);
      setRoute(newRoute.coordinates);
      setDisatnce(newRoute.distance);
      setDuration(newRoute.duration);
      setSteps(newRoute.steps);
      setCurrentDistance(newRoute.currentDistance);
      


      const middleIndex = Math.floor(newRoute.coordinates.length/2);
      const middleCords =  [newRoute.coordinates[middleIndex]];
      console.log(middleCords);

      


      setFormData(prevData => ({
        ...prevData,
        duration: convertDuration(newRoute.duration),
        distance: convertDistance(newRoute.distance)
      }));



     }catch (error) {
      // Log the error
      console.log("An error occurred:", error);
      // Throw the error again to propagate it up
      throw error;
    }
    }

    

    const getRoundTrip = async()=>{
      const roundTrip = await RoundTrip(map, coords, length, points, seed);
      console.log(roundTrip);
      setDisatnce(roundTrip.distance);
      setDuration(roundTrip.duration);
      setSteps(roundTrip.steps);
      setCurrentDistance(roundTrip.currentDistance);
      console.log(roundTrip.currentDistance);
      fetchData();
      handleToggle();


      setFormData(prevData => ({
        ...prevData,
        points: points,
        lenght: length,
        seed: seed,
        duration: convertDuration(roundTrip.duration),
        distance: convertDistance(roundTrip.distance)
      }))
    }

    const handleRound = () =>{
      try {
        getRoundTrip();
        fetchData();
        handleToggle();
      } catch (error) {
        // Log the error
        console.log("An error occurred:", error);
        // Throw the error again to propagate it up
        throw error;
      }
    
    };

    const handletwofun=()=>{
     try{ 
      getRoute();
      fetchData();
      handleToggle();
      setOpen(true);
      checkWeather();
     }catch (error) {
      // Log the error
      console.log("An error occurred:", error);
      // Throw the error again to propagate it up
      throw error;
    }
    }

    const handleDateChange = (newValue) => {
      const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null;
      setValue(formattedDate); 

      setFormData(prevData => ({
        ...prevData,
        startDate: formattedDate
      }))
      

    };

    const handleDateChangeEnd = (newValue) => {   
      const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null;
      setEValue(formattedDate); 

      setFormData(prevData => ({
        ...prevData,
        endDate: formattedDate
      }))
    };
    
    const formattedDays = time.map(value=> {
      const dayName = moment(value).format("dddd HH:mm");
      return dayName;
    });    

    
    const formattedCode = codec.map( value=> {
      const imageUrl = images[value];
      return imageUrl ? <img key={value} src={imageUrl} alt={` ${value}`} width={25} height={25} /> : null;
    }); 

    const formattedCodeSec = codec2.map( value=> {
      const imageUrl2 = images[value];
      return imageUrl2 ? <img key={value} src={imageUrl2} alt={` ${value}`} width={25} height={25} /> : null;
    });
    
    const handleToggle = () => {
      setExpanded(!expanded);
    };


    const handleClose = () => {
      setOpen(false);
    };
    
    const checkWeather = () =>{
      const allCodec = codec.concat(codec2);
      const count = {};
      allCodec.forEach(num =>{
        count[num] = (count[num] || 0)
      });

      let mostFrequentNumber;
      let highestCount = 0;
      for (const num in count) {
          if (count[num] > highestCount) {
              highestCount = count[num];
              mostFrequentNumber = num;
          }
        }

      if(mostFrequentNumber == 0){
        return "Your Trip will be Sunny! Do you want another Route?"
      }
      else if(mostFrequentNumber == 1 || 2 || 3){
        return "Your Route will be Clear Skies! Do you want another Route?"
      }
      else if(mostFrequentNumber == 56 || 57 || 61 || 63 || 65 || 66 || 67){
        return "Your Route will be Rainy! Do you want another Route?"
      }


    }

    
    

    
   



    const  handleDownload= async ()=>{
      const alt = await AlternativesRoutes(map, coords);
      console.log(alt);
      setRoute(alt.coordinates);
      setDisatnce(alt.distance);
      setDuration(alt.duration);
      setSteps(alt.steps);
    };
    

    const handleLengthChange = (event) => {
      const { value } = event.target;
      setLength(value);
      validateForm(value, points, seed);
    };
  
    const handlePointsChange = (event) => {
      const { value } = event.target;
      setPoints(value);
      validateForm(length, value, seed);
    };
  
    const handleSeedChange = (event) => {
      const { value } = event.target;
      setSeed(value);
      validateForm(length, points, value);
    };
  
    const validateForm = (length, points, seed) => {
      // Check if all fields are filled
      if (length && points && seed) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };



    const handleButtonClick = () => {
      // Execute your function here
      if (isFormValid) {
        getRoundTrip();
        console.log("All fields are filled. Executing the function...");
      }
    };



    

    return(

      <>  
      <div style={ {position: "absolute", zIndex: '1000',top:"10px", right:"10px", padding: "5px", width:"350px", height:"500px", overflow: 'auto', borderRadius:"10px", marginBottom:'5px'} }>
      <Accordion defaultExpanded={true}> 
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h2>Route controls</h2>
        </AccordionSummary>
        <AccordionDetails>
         {inputFields.map(inputField => (
          <div key={inputField.id}>
          <TextField id="outlined-basic" 
            label="Where to?" 
            name="location"
            variant="outlined" 
            required={isTextFieldRequired}
            size="small"
            style={{width:'150px', marginTop:'10px'}}
            value={inputField.location}
            onChange={event => handleAll(inputField.id, event)}
            onKeyDown={event => handleKeyDown(event, inputField.location)}
          />
        
          
          <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        ))}
        <Stack spacing={1} direction="row">
        
        <Button variant="contained" style={{marginTop:"3px"}} onClick={handletwofun}><DirectionsIcon /></Button>
        <Button variant="contained" style={{marginTop:"3px"}} onClick={handleButtonClick}
        disabled={!isFormValid}><RefreshIcon/> </Button>
        <Button variant="contained" style={{marginTop:"3px"}} onClick={handleSave}><SaveIcon /></Button>
        
        </Stack>
        <Stack spacing={1} style={{marginTop:"15px"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField 
            label="Start Date"
            value={value}
            onChange={handleDateChange}
           
          />
        </LocalizationProvider>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField 
            label="End Date"
            value={evalue}
            onChange={handleDateChangeEnd}
            
          />
        </LocalizationProvider>
        </Stack>
        <Accordion sx={{marginTop:"10px", borderRadius:"10px"}}> 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h4>ROUND OPTIONS</h4>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: "110px" }}>
           <div style={{width:"170px", display:"flex"}}>
              <TextField
              label="Length"
              id="outlined-start-adornment"
              size="small"
              value={length}
              onChange={handleLengthChange}
              sx={{ m: 1, width: '20ch' }}
              />
              <Tooltip title="The maximum length in meters. (0-100000m)" placement="top-start">
                <IconButton>
                  <HelpIcon/>
                </IconButton>
              </Tooltip>
            </div>
            <div style={{width:"170px", display:"flex"}}>
              <TextField
              label="Points"
              id="outlined-start-adornment2"
              size="small"
              value={points}
              onChange={handlePointsChange}
              sx={{ m: 1, width: '20ch' }}
              
              />
              <Tooltip title="The number of points to use on the route. Larger values create more circular routes" placement="top-start">
                <IconButton>
                  <HelpIcon/>
                </IconButton>
              </Tooltip>
            </div>
            <div style={{width:"170px", display:"flex"}}>
              <TextField
              label="Seed"
              id="outlined-start-adornment3"
              size="small"
              value={seed}
              onChange={handleSeedChange}
              sx={{ m: 1, width: '20ch' }}
    
              />
              <Tooltip title="A random seed to use for adding randomisation to the generated route (min:0, max: 90)" placement="top-start">
                <IconButton>
                  <HelpIcon/>
                </IconButton>
              </Tooltip>
            </div>
          </Box>
        </AccordionDetails>
        </Accordion>

        
        <h3>The distance is: {convertDistance(distance)} km</h3>
        <h3>The duration is: {convertDuration(duration)}</h3>
        <Divider variant="middle" />
        
        <h2>Steps:</h2>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step.instruction}</li>
          ))}
        </ol>
      </AccordionDetails>
      </Accordion>  
      </div>
      
        
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h2>Are you sure that you want to edit your trip?</h2>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/MyRoutes">
            <Button onClick={handleClose}>No</Button>
          </Link>
          <Button onClick={updateFormState} autoFocus>
            Yes!
          </Button>
        </DialogActions>
      </Dialog>
    
      
      
     
      
      
     </> 
    )
  };
    
  export default EditTrip;