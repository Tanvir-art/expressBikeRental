import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendresponse';
import { couponService } from './coupon.service';

const creatCoupon = catchAsync(async (req, res) => {
  const result = await couponService.createCoupon(req.body);
  sendResponse(res, {
    statuseCode: 201,
    success: true,
    message: 'Coupon created successfully',
    data: result,
  });
});

const getAllCouponCOntroller = catchAsync(async (req, res) => {
  const result = await couponService.getAllCoupons();
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: 'Coupons retrieved successfully',
    data: result,
  });
});

const deleteCouponController = catchAsync(async (req, res) => {
  const result = await couponService.deleteCoupon(req.params.id);
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: 'Coupon deleted successfully',
    data: result,
  });
});

export const couponController = {
  creatCoupon,
  getAllCouponCOntroller,
  deleteCouponController,
};
