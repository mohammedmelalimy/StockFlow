// Extend the built-in JavaScript Error class
class AppError extends Error {
  constructor(message, statusCode) {
    // Initialize the parent Error class
    super(message);

    // Store the appropriate HTTP status code
    this.statusCode = statusCode;
  }
}

export default AppError;
