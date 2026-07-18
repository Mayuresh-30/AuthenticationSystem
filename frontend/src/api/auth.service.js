import axiosInstance from './axios.config';
import ENDPOINTS from './endpoints';

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login user
// export const loginUser = async (credentials) => {
//   try {
//     const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);
//     return response;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Refresh access token
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout user
export const logoutUser = async (userId) => {
  try {
    const response = await axiosInstance.post(`${ENDPOINTS.AUTH.LOGOUT}?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Test protected endpoint
export const testProtectedEndpoint = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.PROTECTED.TEST);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user details (example - adjust based on your backend)
export const getUserDetails = async (userId) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.PROTECTED.USER_DETAILS(userId));
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  testProtectedEndpoint,
  getUserDetails,
};