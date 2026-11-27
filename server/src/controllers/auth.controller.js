import * as authService from '../services/auth.service.js';

// Handle the registration HTTP request
export const register = async (req, res, next) => {
  try {
    // Extract registration data from the request body
    const { name, email, password, companyName } = req.body;

    // Call the registration service
    const user = await authService.register({
      name,
      email,
      password,
      companyName
    });

    // Send a successful registration response
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: user
    });
  } catch (error) {
    // Forward the error to the error handling middleware
    next(error);
  }
};
