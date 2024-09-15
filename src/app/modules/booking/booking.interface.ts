import { Types } from 'mongoose';

export type Booking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  totalCost: number;
  isReturned: boolean;
  discount?: number;
  paymentStatus: 'unpaid' | 'paid';
};
