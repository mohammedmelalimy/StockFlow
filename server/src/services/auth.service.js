import mongoose from 'mongoose';
import Organization from '../models/organization.model.js';
import User from '../models/user.model.js';
import { hashPassword } from '../utils/password.js';
import AppError from '../utils/AppError.js';

// Handle new organization and owner registration
export const register = async ({ name, email, password, companyName }) => {
  // Step 1: Normalize the email address
  email = email.trim().toLowerCase();

  // Step 2: Check if the email is already registered
  const existingUser = await User.findOne({ email });

  // Prevent duplicate registration
  if (existingUser) {
    throw new AppError('Email already exists', 409);
  }

  // Step 3: Hash the password
  const hashedPassword = await hashPassword(password);

  // Step 4: Create a database session
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      // Step 5: Create the organization
      const [organization] = await Organization.create([{ name: companyName }], { session });

      // Create the owner of the new organization
      const [user] = await User.create(
        [
          {
            name,
            email,
            password: hashedPassword,
            role: 'owner',
            organizationId: organization._id
          }
        ],
        { session }
      );
      // Return safe user data
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId
      };
    });
  } finally {
    // Always release the session
    await session.endSession();
  }
};;
