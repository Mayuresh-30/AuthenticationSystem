import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  icon: Icon,
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed';

  // Size variants
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-accent-blue text-white hover:bg-accent-blue-hover active:bg-accent-blue-hover/80',
    secondary: 'bg-dark-secondary text-text-primary border border-dark-border hover:bg-dark-tertiary active:bg-dark-hover',
    success: 'bg-accent-success text-white hover:bg-accent-success/80 active:bg-accent-success/70',
    danger: 'bg-accent-error text-white hover:bg-accent-error/80 active:bg-accent-error/70',
    outline: 'bg-transparent text-accent-blue border border-accent-blue hover:bg-accent-blue/10 active:bg-accent-blue/20',
    ghost: 'bg-transparent text-text-secondary hover:bg-dark-tertiary active:bg-dark-hover',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${widthStyles}
        ${className}
      `}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      
      {/* Icon */}
      {Icon && !loading && (
        <Icon className="w-4 h-4 mr-2" />
      )}
      
      {/* Button text */}
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;