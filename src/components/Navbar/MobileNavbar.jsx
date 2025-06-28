import React from 'react';
import { Search, Compass, Heart, User } from 'lucide-react';

const MobileNavbar = () => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white">
      {/* Top Navbar */}
      <div className="px-4 py-3 border-b border-gray-200 top-0 fixed left-0 w-[100vw] z-10 bg-white">
        <div className="flex items-center justify-center bg-gray-100 rounded-full px-4 py-3">
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <span className="text-gray-500 text-sm">Start your search</span>
        </div>
      </div>


      {/* Bottom Navbar */}
      <div className="border-t border-gray-200 bg-white bottom-0 left-0 z-10 w-[100vw] fixed">
        <div className="flex justify-center gap-1">
          {/* Explore */}
          <button className="flex flex-col items-center py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">
            <Compass className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">Explore</span>
          </button>

          {/* Wishlist */}
          <button className="flex flex-col items-center py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">
            <Heart className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">Wishlist</span>
          </button>

          {/* Login */}
          <button className="flex flex-col items-center py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">
            <User className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;