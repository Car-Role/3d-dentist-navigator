import React from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary/60 to-primary-light/60 bg-clip-text text-transparent">
                Dental 3D Printing Guide
              </h1>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link 
              to="/" 
              className={`${
                location.pathname === '/' 
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/resources" 
              className={`${
                location.pathname === '/resources' 
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Resources
            </Link>
            <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Community
            </a>
            <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </div>
          <div className="flex items-center sm:hidden">
            <button className="text-gray-500 hover:text-primary transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;