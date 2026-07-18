import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../utils/validators';
import Input from '../common/Input';
import Button from '../common/Button';
import Form from '../common/Form';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Initialize react-hook-form
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const { reset } = methods;

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await login(data.email, data.password);
      
      if (result.success) {
        // Navigate to dashboard after successful login
        navigate('/dashboard');
        reset();
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form */}
      <Form formMethods={methods} onSubmit={onSubmit}>
        <Input
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          icon={Mail}
          required
          autoComplete="email"
        />

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={Lock}
          required
          autoComplete="current-password"
        />

        {/* Forgot password link (optional) */}
        <div className="text-right">
          <Link 
            to="/forgot-password" 
            className="link-primary text-sm"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          icon={LogIn}
        >
          Sign In
        </Button>
      </Form>

      {/* Footer */}
      <div className="text-center">
        <p className="text-text-secondary text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="link-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;