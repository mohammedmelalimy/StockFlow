import AppError from '../utils/AppError.js';

// Centralized error handling middleware
export const errorHandler = (err, req, res, next) => {
  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A record with this value already exists'
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid data'
    });
  }

  // Handle known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Log unexpected errors on the server
  console.error(err);

  // Do not expose internal error details to the client
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};
