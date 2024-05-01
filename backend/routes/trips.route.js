import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createTrip, deleteTrip, updateTrip, getTrip} from '../controllers/trips.controller.js';


const router = express.Router();


router.post('/create', verifyToken, createTrip);
router.delete('/delete/:id', verifyToken, deleteTrip);
router.post('/update/:id', verifyToken, updateTrip);
router.get('/get/:id', getTrip);


export default router;