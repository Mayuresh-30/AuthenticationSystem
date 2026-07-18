import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../layout/Navbar';
import { testProtectedEndpoint } from '../api/auth.service';
import { 
  User, 
  Shield, 
  Calendar, 
  CheckCircle,
  Activity,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [loading, setLoading] = useState(true);

  // Test protected endpoint on mount
  useEffect(() => {
    console.log("User name is ->>>" + user.userName);
    const testApi = async () => {
      try {
        const response = await testProtectedEndpoint();
        setApiStatus('Connected');
        console.log('Protected API test:', response);
      } catch (error) {
        setApiStatus('Disconnected');
        console.error('API test failed:', error);
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  // Stats data
  const stats = [
    {
      title: 'Account Status',
      value: 'Active',
      icon: CheckCircle,
      color: 'text-accent-success',
    },
    {
      title: 'User Role',
      value: user?.role || 'SHOPKEEPER',
      icon: Shield,
      color: 'text-accent-blue',
    },
    {
      title: 'API Status',
      value: loading ? 'Loading...' : apiStatus,
      icon: Activity,
      color: apiStatus === 'Connected' ? 'text-accent-success' : 'text-accent-error',
    },
  ];

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-text-primary">
            {getGreeting()}, {user.userName}! 👋
          </h1>
          <p className="text-text-secondary mt-2">
            Welcome to your dashboard. You are successfully authenticated.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="card-dark hover:border-dark-hover transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-muted text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-text-primary mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} bg-dark-tertiary p-3 rounded-lg`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Card - Congratulations */}
        <div className="card-dark border-accent-blue border-2 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="bg-accent-blue/10 p-3 rounded-lg">
              <CheckCircle className="text-accent-blue" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                Congratulations! 🎉
              </h2>
              <p className="text-text-secondary mt-2">
                You have successfully authenticated and accessed the protected dashboard.
                Your account is secure with JWT authentication.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar size={16} />
                  <span>Account created: {new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock size={16} />
                  <span>Session: Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-dark">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
              <User size={18} className="text-accent-blue" />
              Your Profile
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-text-muted">Name</span>
                <span className="text-text-primary">{user.userName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-text-muted">Email</span>
                <span className="text-text-primary">{user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-text-muted">Role</span>
                <span className="text-text-primary">{user?.role || 'SHOPKEEPER'}</span>
              </div>
            </div>
          </div>

          <div className="card-dark">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Shield size={18} className="text-accent-blue" />
              Security Info
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-text-muted">Authentication</span>
                <span className="text-accent-success">JWT</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-text-muted">Token Expiry</span>
                <span className="text-text-primary">15 minutes</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-text-muted">Refresh Token</span>
                <span className="text-text-primary">7 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;