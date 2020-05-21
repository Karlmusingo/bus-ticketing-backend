import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    default: new Date(),
  },
  bus: {
    type: Schema.Types.ObjectId, ref: 'Bus',
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

export default model('Ticket', ticketSchema);
