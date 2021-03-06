import { Joi } from 'celebrate';

const createTicket = Joi.object().keys({
  name: Joi.string().trim().required(),
  dob: Joi.date().iso().required(), // YYYY-MM-DD
});

export default {
  createTicket,
};
