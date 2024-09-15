import mongoose, { Types } from 'mongoose';
import { bookingModel } from './booking.model';
import { BikeModel } from '../Bike/bike.model';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const updateBikeAvailability = async (
  bikeId: Types.ObjectId,
  isAvailable: boolean,
  session: any,
) => {
  await BikeModel.updateOne({ _id: bikeId }, { isAvailable }, { session });
};

const createRentalIntoDb = async (
  userId: Types.ObjectId,
  bikeId: Types.ObjectId,
  startTime: Date,
  user: any,
  discount: number,
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
      discount: discount,
      paymentStatus: 'unpaid',
    };

    const bookingResult = await bookingModel.create([newBooking], { session });

    await updateBikeAvailability(bikeId, false, session);

    const paymentData = {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      amount: 100, // advance payment amount
      currency: 'BDT',
      tran_id: `TXN-${Date.now()}`,
      success_url: `${process.env.BASE_URL}/api/rentals/confirmation`,
      fail_url: 'http://www.merchantdomain.com/failedpage.html',
      cancel_url: 'http://www.merchantdomain.com/cancellpage.html',
      desc: 'Merchant Registration Payment',
      cus_name: user.name,
      cus_email: user.email,
      cus_phone: user.phone,
      type: 'json',
    };

    const paymentResponse = await axios.post(
      process.env.PAYMENT_URL!,
      paymentData,
    );

    // console.log('Payment Response:', paymentResponse.data);

    if (paymentResponse.data && paymentResponse.data.result === 'true') {
      await session.commitTransaction();
      session.endSession();

      return {
        booking: bookingResult[0],
        paymentUrl: paymentResponse.data.payment_url,
      };
    } else {
      throw new Error('Payment initiation failed');
    }
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

    // Calculate total rental cost
    const startTime = booking.startTime;
    const durationInHours =
      (returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    let totalCost = Math.floor(durationInHours * pricePerHour);
    console.log('booking.discount', booking.discount);
    // Apply coupon discount if a valid coupon code is provided
    if (booking.discount > 0) {
      console.log('booking.discount', booking.discount);
      totalCost -= (totalCost * booking.discount) / 100; // Apply discount
    }

    booking.returnTime = returnTime;
    booking.totalCost = totalCost >= 0 ? totalCost : 0;
    booking.isReturned = true;
    booking.paymentStatus = 'paid';
    await booking.save({ session });

    // Mark bike as available
    await BikeModel.updateOne(
      { _id: booking.bikeId },
      { isAvailable: true },
      { session },
    );

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
