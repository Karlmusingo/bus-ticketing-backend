import express from 'express';
import { celebrate } from 'celebrate';
import { TicketController } from '../../../controllers';
import { ticketValidator } from './validators';
import { asyncHandler } from '../../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(asyncHandler(TicketController.getAll))
  .post(
    celebrate({ body: ticketValidator.createTicket }),
    asyncHandler(TicketController.create),
  );

router.route('/today').get(asyncHandler(TicketController.getForToday));

export default router;
