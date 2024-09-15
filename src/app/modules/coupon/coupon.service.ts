import { Coupon } from './coupon.interface';
import { couponModel } from './coupon.model';

const createCoupon = async (data: Coupon) => {
  const coupon = await couponModel.create(data);
  return coupon;
};

const getAllCoupons = async () => {
  const coupons = await couponModel.find();
  return coupons;
};

const getCouponByCode = async (code: string) => {
  const coupon = await couponModel.findOne({ code, isActive: true });
  if (!coupon || coupon.expiryDate < new Date()) {
    throw new Error('Invalid or expired coupon');
  }
  return coupon;
};

const deleteCoupon = async (id: string) => {
  const coupon = await couponModel.findByIdAndDelete(id);
  return coupon;
};

export const couponService = {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  deleteCoupon,
};
