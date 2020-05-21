import express from 'express';
import tickets from './tickets';

const router = express.Router();

router.use('/tickets', tickets);


export default router;
