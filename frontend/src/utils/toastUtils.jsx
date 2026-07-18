import toast from 'react-hot-toast';

// Success toast
export const showSuccess = (message, duration = 4000) => {
  return toast.success(message, {
    duration,
    style: {
      background: '#1a1a1a',
      color: '#ffffff',
      border: '1px solid #333333',
      borderRadius: '8px',
    },
    iconTheme: {
      primary: '#22c55e',
      secondary: '#ffffff',
    },
  });
};

// Error toast
export const showError = (message, duration = 5000) => {
  return toast.error(message, {
    duration,
    style: {
      background: '#1a1a1a',
      color: '#ffffff',
      border: '1px solid #333333',
      borderRadius: '8px',
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#ffffff',
    },
  });
};

// Info toast
export const showInfo = (message, duration = 3000) => {
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-fade-in' : 'opacity-0'
      } bg-dark-secondary text-text-primary border border-dark-border rounded-lg px-4 py-3 shadow-lg max-w-md`}
    >
      <div className="flex items-center gap-2">
        <span className="text-accent-blue">ℹ️</span>
        <span>{message}</span>
      </div>
    </div>
  ), { duration });
};

// Loading toast (returns id for updating)
export const showLoading = (message) => {
  return toast.loading(message, {
    style: {
      background: '#1a1a1a',
      color: '#ffffff',
      border: '1px solid #333333',
      borderRadius: '8px',
    },
  });
};

// Update loading toast
export const updateToast = (toastId, type, message) => {
  toast[type](message, {
    id: toastId,
    style: {
      background: '#1a1a1a',
      color: '#ffffff',
      border: '1px solid #333333',
      borderRadius: '8px',
    },
  });
};

// Dismiss toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

export default {
  showSuccess,
  showError,
  showInfo,
  showLoading,
  updateToast,
  dismissToast,
};