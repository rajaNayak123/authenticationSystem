import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { config } from '../config';

export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const globalErrorHandler = (
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal server error';
  let details = undefined;

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    details = error.details;
  } else if (error.message.includes('Unique constraint')) {
    statusCode = 409;
    message = 'Resource already exists';
    if (error.message.includes('email')) {
      message = 'Email address is already registered';
    }
  } else if (error.message.includes('Record to update not found')) {
    statusCode = 404;
    message = 'Resource not found';
  }

  const response: ApiResponse = {
    success: false,
    message,
    ...(details && { error: details }),
  };

  // Log error in development
  if (config.nodeEnv === 'development') {
    console.error('Error:', error);
    response.error = {
      ...response.error,
      stack: error.stack,
    };
  }

  res.status(statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};