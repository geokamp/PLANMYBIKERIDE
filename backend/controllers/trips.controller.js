import Trips from "../models/trips.model.js";
import { errorHandler } from '../utils/error.js';


export const createTrip = async (req, res, next) => {
    try {
      const trip = await Trips.create(req.body);
      return res.status(201).json(trip);
    } catch (error) {
      next(error);
    }
  };


  export const deleteTrip = async (req, res, next) => {
    const trip = await Trips.findById(req.params.id);
  
    if (!trip) {
      return next(errorHandler(404, 'Trip not found!'));
    }
  
    if (req.user.id !== trip.userRef) {
      return next(errorHandler(401, 'You can only delete your own  trips!'));
    }
  
    try {
      await Trips.findByIdAndDelete(req.params.id);
      res.status(200).json('Trip has been deleted!');
    } catch (error) {
      next(error);
    }
  };



  



