import bcrypt from 'bcryptjs';

// Define the computational cost of password hashing
const COST_FACTOR = 12;

// Hash the plain-text password before saving it
export const hashPassword = async (password) => {
  // Reject passwords exceeding bcrypt's 72-byte limit
  if (Buffer.byteLength(password, 'utf8') > 72) {
    throw new Error('Password must not exceed 72 bytes');
  }

  return bcrypt.hash(password, COST_FACTOR);
};

// Verify the entered password against the stored hash
export const comparePassword = async (password, hashedPassword) => {
  if (Buffer.byteLength(password, 'utf8') > 72) {
    return false;
  }

  return bcrypt.compare(password, hashedPassword);
};
