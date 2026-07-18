import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userUpdateSchema } from '../utils/validators';
import Navbar from '../layout/Navbar';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Form from '../components/common/Form';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Edit2, 
  Save, 
  X,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserDetailPage = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize form
  const methods = useForm({
    resolver: yupResolver(userUpdateSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    mode: 'onBlur',
  });

  const { reset } = methods;

  // Reset form when user changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || user.userName || '',
        email: user.email || '',
      });
    }
  }, [user, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Simulate API update - Replace with actual API call
      // const response = await updateUser(data);
      
      // Update local user state
      setUser({
        ...user,
        name: data.name,
        userName: data.name,
        email: data.email,
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard" 
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-text-primary">My Profile</h1>
          </div>
          
          {!isEditing && (
            <Button
              variant="secondary"
              size="sm"
              icon={Edit2}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-dark text-center animate-fade-in">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-accent-blue flex items-center justify-center text-white text-3xl font-bold">
                  {user?.userName?.charAt(0) || 'U'}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-text-primary">
                {user?.userName }
              </h2>
              <p className="text-text-muted text-sm">{user?.email}</p>
              
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <span className="text-xs bg-dark-tertiary text-text-secondary px-3 py-1 rounded-full flex items-center gap-1">
                  <Shield size={12} />
                  {user?.role || 'SHOPKEEPER'}
                </span>
                <span className="text-xs bg-dark-tertiary text-text-secondary px-3 py-1 rounded-full flex items-center gap-1">
                  <Calendar size={12} />
                  Member
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-dark-border">
                <div className="text-sm text-text-muted">
                  <p>Member since</p>
                  <p className="text-text-primary">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="card-dark animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {isEditing ? 'Edit Profile' : 'Profile Details'}
              </h3>

              {isEditing ? (
                <Form formMethods={methods} onSubmit={onSubmit}>
                  <Input
                    name="name"
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    icon={User}
                    required
                  />

                  <Input
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    icon={Mail}
                    required
                  />

                  <div className="flex items-center gap-4 pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      icon={Save}
                      loading={loading}
                    >
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      icon={X}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-dark-border">
                    <span className="text-text-muted flex items-center gap-2">
                      <User size={16} />
                      Full Name
                    </span>
                    <span className="text-text-primary font-medium">
                      {user?.name || 'Not set'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-dark-border">
                    <span className="text-text-muted flex items-center gap-2">
                      <Mail size={16} />
                      Email Address
                    </span>
                    <span className="text-text-primary font-medium">
                      {user?.email || 'Not set'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-dark-border">
                    <span className="text-text-muted flex items-center gap-2">
                      <Shield size={16} />
                      Role
                    </span>
                    <span className="text-accent-blue font-medium">
                      {user?.role || 'SHOPKEEPER'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3">
                    <span className="text-text-muted flex items-center gap-2">
                      <Calendar size={16} />
                      Account Status
                    </span>
                    <span className="text-accent-success font-medium flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent-success rounded-full animate-pulse"></span>
                      Active
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 card-dark animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h4 className="text-sm font-medium text-text-muted mb-3">Security</h4>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-dark-border">
                <span className="text-text-muted text-sm">Password</span>
                <button className="text-accent-blue text-sm hover:text-accent-blue-hover transition-colors">
                  Change Password
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2">
                <span className="text-text-muted text-sm">Two-Factor Authentication</span>
                <button className="text-accent-blue text-sm hover:text-accent-blue-hover transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;