import express from 'express';
// import validateRequest from '../../middleware/valdateRequest';
// import { bikeValidation } from './bike.validation';
// import { BikeControllers } from './bike.controller';
// import auth from '../../middleware/auth';
// import { USER_ROLE } from '../user/user.constant';
import { bookingController } from './booking.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/valdateRequest';
import { bookingVlidation } from './booking.validation';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(bookingVlidation.CreateBookingValidation),
  bookingController.createBooking,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  bookingController.getAllBooking,
);

router.put(
  '/:id/return',
  auth(USER_ROLE.admin),
  // validateRequest(bikeValidation.updateBikeValidationSchema),
  bookingController.returnBike,
);

router.post(
  '/confirmation',

  paymentController.confirmation,
);

export const BookingRoutes = router;
