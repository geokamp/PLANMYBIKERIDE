import mongoose from 'mongoose';


const tripsSchema = new mongoose.Schema(
    {
      start: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      distance: {
        type: String,
        required: true,
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
