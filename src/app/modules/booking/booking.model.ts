import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
  startTime: { type: Date, required: true },
  returnTime: { type: Date, default: null },
  totalCost: { type: Number, default: 0 },
  isReturned: { type: Boolean, default: false },
});

export const bookingModel = model('Booking', bookingSchema);
