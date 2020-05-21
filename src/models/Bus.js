import mongoose, { Schema } from 'mongoose';

const BusSchema = new Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },

  ticketCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Bus', BusSchema);
