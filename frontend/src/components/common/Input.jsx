import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Input = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  autoComplete = 'off',
  className = '',
  icon: Icon,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const [showPassword, setShowPassword] = React.useState(false);
  const error = errors[name];
  const value = watch(name);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine input type for password fields
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-text-secondary mb-2"
        >
          {label}
          {required && <span className="text-accent-error ml-1">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            <Icon size={20} />
          </div>
        )}

        {/* Input field */}
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
            input-dark
            ${Icon ? 'pl-10' : ''}
            ${type === 'password' ? 'pr-10' : ''}
            ${error ? 'error' : ''}
            ${className}
          `}
          {...register(name)}
          {...props}
        />

        {/* Password toggle button */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            tabIndex="-1"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 flex items-center gap-1 text-sm text-accent-error animate-fade-in">
          <AlertCircle size={16} />
          <span>{error.message}</span>
        </div>
      )}

      {/* Character counter for password */}
      {type === 'password' && value && value.length > 0 && (
        <div className="mt-2 flex justify-between text-xs">
          <span className={`
            ${value.length < 8 ? 'text-accent-error' : 'text-accent-success'}
          `}>
            {value.length < 8 ? 'Password is too short' : 'Password strength: Good'}
          </span>
          <span className="text-text-muted">
            {value.length}/8 characters minimum
          </span>
        </div>
      )}
    </div>
  );
};

export default Input;