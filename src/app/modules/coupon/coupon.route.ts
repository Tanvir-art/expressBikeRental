import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { couponVlidation } from './coupon.validation';
import validateRequest from '../../middleware/valdateRequest';
import { couponController } from './coupon.controller';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(couponVlidation.createCouponValidation),
  couponController.creatCoupon,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  couponController.getAllCouponCOntroller,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  couponController.deleteCouponController,
);

export const couponRouter = router;
