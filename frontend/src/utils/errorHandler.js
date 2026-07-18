import toast from 'react-hot-toast';

// Format error message from backend
export const formatErrorMessage = (error) => {
  if (error.message) {
    return error.message;
  }
  
  if (error.error) {
    return error.error;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};

// Handle API errors with toast notifications
export const handleApiError = (error, customMessage = null) => {
  let errorMessage = customMessage || 'Something went wrong';
  
  // Check if error is from backend
  if (error.response?.data) {
    const errorData = error.response.data;
    errorMessage = formatErrorMessage(errorData);
  } else if (error.message) {
    errorMessage = error.message;
  }
  
  // Show toast notification
  toast.error(errorMessage);
  
  // Return formatted error for logging or further handling
  return {
    message: errorMessage,
    status: error.response?.status,
    data: error.response?.data,
  };
};

// Success handler with toast
export const handleSuccess = (message) => {
  toast.success(message);
  return message;
};

// Validation error handler
export const handleValidationErrors = (errors) => {
  const errorMessages = Object.values(errors).map(err => err.message);
  errorMessages.forEach(msg => toast.error(msg));
  return errorMessages;
};

export default {
  formatErrorMessage,
  handleApiError,
  handleSuccess,
  handleValidationErrors,
};