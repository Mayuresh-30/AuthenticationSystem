import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../utils/validators';
import Input from '../common/Input';
import Button from '../common/Button';
import Form from '../common/Form';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Initialize react-hook-form
  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const { reset } = methods;

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = data;
      
      const result = await registerUser(userData);
      
      if (result.success) {
        // Navigate to dashboard after successful registration and auto-login
        navigate('/dashboard');
        reset();
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">
          Join us and start your journey
        </p>
      </div>

      {/* Form */}
      <Form formMethods={methods} onSubmit={onSubmit}>
        <Input
          name="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={User}
          required
          autoComplete="name"
        />

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
          placeholder="Create a strong password"
          icon={Lock}
          required
          autoComplete="new-password"
        />

        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          icon={Lock}
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          icon={UserPlus}
        >
          Create Account
        </Button>
      </Form>

      {/* Footer */}
      <div className="text-center">
        <p className="text-text-secondary text-sm">
          Already have an account?{' '}
          <Link to="/login" className="link-primary font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;