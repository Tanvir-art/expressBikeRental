import { z } from 'zod';

const CreateBookingValidation = z.object({
  body: z.object({
    bikeId: z.string({
      required_error: 'bikeId is required',
      invalid_type_error: 'bikeId must be string',
    }),
    startTime: z.string({
      required_error: 'startTime is required',
    }),
  }),
});

export const bookingVlidation = {
  CreateBookingValidation,
};
