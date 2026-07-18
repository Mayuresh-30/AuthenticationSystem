// Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  // Protected endpoints
  PROTECTED: {
    TEST: `${API_BASE_URL}/test`,
    USER_DETAILS: (userId) => `${API_BASE_URL}/users/${userId}`,
  }
};

export default ENDPOINTS;