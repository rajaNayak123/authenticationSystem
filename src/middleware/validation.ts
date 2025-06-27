import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ApiError } from './errorHandler';

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        next(new ApiError(400, 'Validation failed', errors));
      } else {
        next(new ApiError(400, 'Invalid request data'));
      }
    }
  };
};