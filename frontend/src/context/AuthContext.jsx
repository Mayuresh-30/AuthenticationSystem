import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAccessToken, 
  getRefreshToken, 
  setTokens, 
  clearTokens,
  getUserData,
  setUserData,
  getUserFromToken,
} from '../utils/tokenManager';
import { loginUser, registerUser, logoutUser, refreshAccessToken } from '../api/auth.service';
import { showSuccess, showError, showLoading, updateToast, dismissToast } from '../utils/toastUtils.jsx';
// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          // const userData = getUserData() || getUserFromToken();
          const userData =  getUserFromToken();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            clearTokens();
            setIsAuthenticated(false);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        clearTokens();
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    let toastId = null;
    try {
      setLoading(true);
      toastId = showLoading('Signing in...');

      const response = await loginUser({ email, password });
      const { userName, data } = response;
      const { accessToken, refreshToken } = data;

      setTokens(accessToken, refreshToken);

      const decodedUser = getUserFromToken();
      const normalizedName = userName || decodedUser?.name || decodedUser?.userName || email.split('@')[0];

      const userData = {
        email: decodedUser?.email || email,
        userName: normalizedName,
        name: normalizedName,
        role: decodedUser?.role || 'SHOPKEEPER',
      };

      setUserData(userData);
      setUser(userData);
      setIsAuthenticated(true);

      updateToast(toastId, 'success', `Welcome back, ${userData.userName || 'User'}!`);
      return { success: true, data: response };
    } catch (error) {
      console.error('Login error:', error);
      if (toastId) {
        updateToast(toastId, 'error', error.message || 'Login failed. Please try again.');
      } else {
        showError(error.message || 'Login failed. Please try again.');
      }
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    let toastId = null;
    try {
      setLoading(true);
      toastId = showLoading('Creating account...');

      const response = await registerUser(userData);
      
      showSuccess(`${userData.name || 'User'} registered successfully!`);
      
      // Auto login after registration
      const loginResult = await login(userData.email, userData.password);
      
      return { 
        success: true, 
        data: response,
        autoLogin: loginResult 
      };
    } catch (error) {
      console.error('Registration error:', error);
      if (toastId) {
        updateToast(toastId, 'error', error.message || 'Registration failed. Please try again.');
      } else {
        showError(error.message || 'Registration failed. Please try again.');
      }
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      const userData = getUserData();
      if (userData?.id) {
        await logoutUser(userData.id);
      }
      
      clearTokens();
      setUser(null);
      setIsAuthenticated(false);
      
      showSuccess('Logged out successfully!');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      clearTokens();
      setUser(null);
      setIsAuthenticated(false);
      showError('Logout completed with some issues.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshTokenValue = getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const response = await refreshAccessToken(refreshTokenValue);
      const { accessToken, refreshToken: newRefreshToken } = response;
      
      setTokens(accessToken, newRefreshToken);
      
      return { success: true, data: response };
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

export default AuthContext;