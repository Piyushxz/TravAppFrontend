import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/auth-context';
import { User, Mail, Phone, Settings, LogOut, Heart, MapPin, Calendar } from 'lucide-react';

export const UserProfile = ({ isOpen, onClose }) => {
  const { accessToken, username, name, email, number, authDispatch } = useAuth();

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    onClose();
  };

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
    console.log("Edit profile clicked");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-manrope font-semibold tracking-tight">
                    {name || username || 'User Profile'}
                  </h2>
                  <p className="text-white/80 text-sm">Welcome back!</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6 space-y-4">
            {/* User Details */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-manrope text-gray-900 tracking-tight">{email || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-manrope text-gray-900 tracking-tight">{number || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-manrope text-gray-900 tracking-tight">{username || 'Not set'}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <Heart className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Wishlist</p>
                <p className="font-manrope font-semibold text-orange-600">0</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Trips</p>
                <p className="font-manrope font-semibold text-blue-600">0</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-100 p-4 space-y-2">


            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors group"
            >
              <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
              <span className="font-manrope text-gray-900 tracking-tight group-hover:text-red-600">Logout</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfile;
