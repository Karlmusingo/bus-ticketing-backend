import express from 'express';
import { TicketController } from '../../../controllers';

const router = express.Router();

router.route('/').get(TicketController.getAll);

export default router;
