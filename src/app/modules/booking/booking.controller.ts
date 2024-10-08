import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendresponse';
import { BookingServices } from './booking.service';
import mongoose from 'mongoose';
import { BikeModel } from '../Bike/bike.model';
import { bookingModel } from './booking.model';

// const createBooking = catchAsync(async (req, res) => {
//   // const userId = req.user._id;
//   const { bikeId, startTime } = req.body;
//   const result = await BookingServices.createRentalIntoDb(
//     req.user._id,
//     bikeId,
//     new Date(startTime),
//   );

//   sendResponse(res, {
//     statuseCode: httpStatus.OK,
//     success: true,
//     message: 'Rental created successfully ',
//     data: result,
//   });
// });

const createBooking = catchAsync(async (req, res) => {
  const { bikeId, startTime, discount } = req.body;

  const result = await BookingServices.createRentalIntoDb(
    req.user._id,
    bikeId,
    new Date(startTime),
    req.user, // Pass user information
    discount,
  );

  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully. Proceed to payment.',
    data: result,
  });
});

// const returnBike = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const returnTime = new Date();
//   const rentalId = new mongoose.Types.ObjectId(id);
//   const result = await BookingServices.returnBike(rentalId, returnTime, 15);
//   sendResponse(res, {
//     statuseCode: httpStatus.OK,
//     success: true,
//     message: 'Rental updated successfully ',
//     data: result,
//   });
// });

const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const returnTime = new Date();
  const rentalId = new mongoose.Types.ObjectId(id);
  console.log('rentalId', rentalId);

  // Fetch the rental details by rentalId
  // const rental = await BookingServices.getRentalById(rentalId);
  const rental = await bookingModel.findById(rentalId);
  if (!rental) {
    throw new Error('Invalid rental ID');
  }
  const bikeID = new mongoose.Types.ObjectId(rental?.bikeId);
  const bike = await BikeModel.findById(bikeID);
  console.log('rental', rental);
  if (!bike) {
    throw new Error('Invalid bike ID');
  }

  // Get the pricePerHour from the rental
  const pricePerHour = bike.pricePerHour;
  console.log('pricePerHour', pricePerHour);
  // Pass couponCode and dynamic pricePerHour to the returnBike service function
  const result = await BookingServices.returnBike(
    rentalId,
    returnTime,
    pricePerHour,
    // couponCode,
  );

  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: 'Rental updated successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await BookingServices.getAllRentalsForUser(userId);

  if (!result) {
    sendResponse(res, {
      statuseCode: httpStatus.OK,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  } else {
    sendResponse(res, {
      statuseCode: httpStatus.OK,
      success: true,
      message: 'Rentals retrieved successfully',
      data: result,
    });
  }
});

// const updateBooking = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await BookingServices.updateBookingIntoDb(id, req.body);

//   sendResponse(res, {
//     statuseCode: httpStatus.OK,
//     success: true,
//     message: 'Rental is updated succesfully',
//     data: result,
//   });
// });

// const deleteCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await BookingServices.deleteBookingIntoDb(id);

//   sendResponse(res, {
//     statuseCode: httpStatus.OK,
//     success: true,
//     message: 'Course is deleted succesfully',
//     data: result,
//   });
// });

export const bookingController = {
  createBooking,
  getAllBooking,
  returnBike,
  // updateBooking,
  // deleteCourse,
};
