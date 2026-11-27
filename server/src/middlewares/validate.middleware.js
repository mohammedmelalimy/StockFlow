// Create a reusable validation middleware
export const validate = (schema) => {
  return (req, res, next) => {
    // Validate the incoming request body
    const result = schema.safeParse(req.body);

    // Return validation errors if the data is invalid
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      });
    }

    // Replace the request body with validated data
    req.body = result.data;

    // Continue to the next middleware or controller
    next();
  };
};
