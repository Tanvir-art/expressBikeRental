import { z } from 'zod';

const createCouponValidation = z.object({
  body: z.object({
    code: z.string({
      required_error: 'code is required',
      invalid_type_error: 'code must be string',
    }),
    discount: z.number({
      required_error: 'discount is required',
      invalid_type_error: 'discount must be number',
    }),
    expiryDate: z.string({
      required_error: 'expiryDate is required',
    }),
  }),
});

export const couponVlidation = {
  createCouponValidation,
};
