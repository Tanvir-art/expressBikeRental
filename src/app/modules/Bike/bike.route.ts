import express from 'express';
import validateRequest from '../../middleware/valdateRequest';
import { bikeValidation } from './bike.validation';
import { BikeControllers } from './bike.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(bikeValidation.createBikeValidationSchema),
  BikeControllers.createBike,
);

router.get('/', BikeControllers.getAllBike);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(bikeValidation.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.delete('/:id', auth(USER_ROLE.admin), BikeControllers.deleteBike);

export const BikeRoutes = router;
