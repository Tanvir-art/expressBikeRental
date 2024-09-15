import { model, Schema } from 'mongoose';

const couponSchema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

export const couponModel = model('Coupon', couponSchema);
