// Import Mongoose to interact with MongoDB
import mongoose from 'mongoose';

// Define the user schema and its validation rules
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true // Remove leading and trailing whitespace
    },

    // User's email address used for authentication
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Create a unique index to prevent duplicate emails
      lowercase: true, // Convert email to lowercase
      trim: true // Remove unnecessary whitespace
    },

    // User's password
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false // Exclude password from query results by default
      // Only the hashed password should be stored in the database
    },

    // User's role within the organization (RBAC)
    role: {
      type: String,

      // Restrict roles to the allowed values
      enum: ['owner', 'admin', 'staff'],

      // Assign the staff role if no role is provided
      default: 'staff'
    },

    // Reference to the organization the user belongs to (Tenant ID)
    organizationId: {
      // MongoDB document identifier type
      type: mongoose.Schema.Types.ObjectId,

      // Reference the Organization model
      // Allows retrieving organization details using populate()
      ref: 'Organization',

      // Every user must belong to an organization
      required: true,

      // Improve query performance when filtering users by organization
      index: true
    },

    // Indicates whether the user's account is active
    isActive: {
      type: Boolean,

      // Accounts are active by default
      default: true

      // Allows disabling an account without permanently deleting it
    }
  },
  {
    // Automatically generate and maintain createdAt and updatedAt
    timestamps: true
  }
);

// Create the User model from the schema
// Provides database operations such as create(), find(), and findById()
const User = mongoose.model('User', userSchema);

// Export the model for use in controllers, services, and middlewares
export default User;
