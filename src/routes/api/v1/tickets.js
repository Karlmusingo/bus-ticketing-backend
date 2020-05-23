import express from 'express';
import { celebrate } from 'celebrate';
import { TicketController } from '../../../controllers';
import { ticketValidator } from './validators';

const router = express.Router();

router
  .route('/')
  .get(TicketController.getAll)
  .post(
    celebrate({ body: ticketValidator.createTicket }),
    TicketController.create,
  );

export default router;
