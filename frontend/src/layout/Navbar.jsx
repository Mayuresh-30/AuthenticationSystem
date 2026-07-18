import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  const displayName = user?.userName || user?.name || 'User';

  // Get user initials for avatar
  const getInitials = () => {
    if (!displayName) return 'U';
    return displayName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <nav className="navbar flex items-center justify-between">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <span className="text-white font-semibold text-lg">AuthApp</span>
      </Link>

      {/* Right side - User Avatar & Dropdown */}
      <div className="dropdown-container relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 hover:bg-dark-tertiary rounded-lg px-3 py-2 transition-colors"
        >
          {/* Avatar */}
          <div className="avatar">
            {getInitials()}
          </div>
          
          {/* User Name */}
          <span className="text-text-secondary text-sm hidden sm:block">
            {displayName}
          </span>
          
          {/* Chevron */}
          <ChevronDown 
            size={16} 
            className={`text-text-muted transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-dark-secondary border border-dark-border rounded-lg shadow-xl py-1 z-50 animate-fade-in">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-dark-border">
              <p className="text-text-primary font-medium">{user?.name}</p>
              <p className="text-text-muted text-sm">{user?.email}</p>
              {user?.role && (
                <span className="inline-block mt-1 text-xs bg-dark-tertiary text-text-secondary px-2 py-0.5 rounded-full">
                  {user.role}
                </span>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                to="/user-details"
                className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-dark-tertiary hover:text-text-primary transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User size={16} />
                <span>My Profile</span>
              </Link>
              
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-dark-tertiary hover:text-text-primary transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings size={16} />
                <span>Settings</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-dark-border"></div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-accent-error hover:bg-dark-tertiary transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;