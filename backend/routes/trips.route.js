import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createTrip, deleteTrip } from '../controllers/trips.controller.js';


const router = express.Router();


router.post('/create', verifyToken, createTrip);
router.delete('/delete/:id', verifyToken, deleteTrip);



export default router;