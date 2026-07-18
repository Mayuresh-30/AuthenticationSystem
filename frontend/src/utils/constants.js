// User roles
export const USER_ROLES = {
  SHOPKEEPER: 'SHOPKEEPER',
  ADMIN: 'ADMIN',
};

// Token expiration in milliseconds
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// API status codes
export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  EMAIL_EXISTS: 'Email already exists',
  PASSWORD_MIN: 'Password must be at least 8 characters',
  PASSWORD_MISMATCH: 'Passwords do not match',
  NAME_REQUIRED: 'Name is required',
};

// Toast notification durations
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
};

export default {
  USER_ROLES,
  TOKEN_EXPIRY,
  API_STATUS,
  VALIDATION_MESSAGES,
  TOAST_DURATION,
};