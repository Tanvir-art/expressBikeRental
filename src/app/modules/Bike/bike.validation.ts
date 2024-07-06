import { z } from 'zod';

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name must be string',
    }),
    description: z.string({
      required_error: 'description is required',
      invalid_type_error: 'description must be string',
    }),
    pricePerHour: z.number({
      required_error: 'pricePerHour is required',
      invalid_type_error: 'pricePerHour must be number',
    }),
    cc: z.number({
      required_error: 'cc is required',
      invalid_type_error: 'cc must be number',
    }),
    year: z.number({
      required_error: 'year is required',
      invalid_type_error: 'year must be number',
    }),
    model: z.string({
      required_error: 'model is required',
      invalid_type_error: 'model must be string',
    }),
    brand: z.string({
      required_error: 'brand is required',
      invalid_type_error: 'brand must be string',
    }),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    cc: z.number().optional(),
    year: z.number().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
  }),
});

export const bikeValidation = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
