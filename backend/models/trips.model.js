import mongoose from 'mongoose';


const tripsSchema = new mongoose.Schema(
    {
      waypoints: {
        type: [String],
        required: true,
      },
      duration:{
        type : String
      },
      distance:{
        type : String
      },
      startDate:{
        type : String
      },
      endDate:{
        type : String
      },
      lenght:{
        type : String
      },
      points:{
        type : String
      },
      seed:{
        type : String
      },
      gpx:{
        type:[[Number]]
      },
      userRef: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const Trips = mongoose.model('Trips', tripsSchema);
  
  export default Trips;
