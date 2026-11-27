import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema } from '../validations/auth.validation.js';

const router = express.Router();

// Validate registration data before executing the controller
router.post('/register', validate(registerSchema), authController.register);

export default router;
