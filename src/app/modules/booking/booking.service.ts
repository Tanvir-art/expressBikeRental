import mongoose, { Types } from 'mongoose';
// import { Booking } from './booking.interface';
import { bookingModel } from './booking.model';
import { BikeModel } from '../Bike/bike.model';
const createRentalIntoDb = async (
  userId: Types.ObjectId,
  bikeId: Types.ObjectId,
  startTime: Date,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bike = await BikeModel.findById(bikeId).session(session);
    if (!bike || !bike.isAvailable) {
      throw new Error('Bike is not available');
    }

    const newBooking = {
      userId,
      bikeId,
      startTime,
      returnTime: null,
      totalCost: 0,
      isReturned: false,
    };

    const bookingResult = await bookingModel.create([newBooking], { session });

    bike.isAvailable = false;
    await BikeModel.updateOne(
      { _id: bikeId },
      { isAvailable: false },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return bookingResult[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const returnBike = async (
  rentalId: Types.ObjectId,
  returnTime: Date,
  pricePerHour: number,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await bookingModel.findById(rentalId).session(session);
    if (!booking || booking.isReturned) {
      throw new Error('Invalid rental ID or bike already returned');
    }

    const bike = await BikeModel.findById(booking.bikeId).session(session);
    if (!bike) {
      throw new Error('Bike not found');
    }

    const startTime = booking.startTime;
    const durationInHours =
      (returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const totalCost = Math.floor(durationInHours * pricePerHour);

    booking.returnTime = returnTime;
    booking.totalCost = totalCost;
    booking.isReturned = true;
    await booking.save({ session });

    bike.isAvailable = true;
    await bike.save({ session });

    await session.commitTransaction();
    session.endSession();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllRentalsForUser = async (userId: Types.ObjectId) => {
  const rentals = await bookingModel.find({ userId });
  return rentals;
};

export const BookingServices = {
  createRentalIntoDb,
  getAllRentalsForUser,
  returnBike,
};
