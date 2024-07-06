import express from 'express';
import validateRequest from '../../middleware/valdateRequest';
import { UserValidation } from './user.validations';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/signup',

  validateRequest(UserValidation.userValidationSchema),
  UserController.signupNewUSer,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginSchema),
  UserController.loginUser,
);

router.get(
  '/users/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getUserByToken,
);
router.put(
  '/users/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.updateUserSchema),
  UserController.updateUserData,
);

export const userRoutes = router;
