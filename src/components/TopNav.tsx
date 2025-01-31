import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const TopNav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              3D Dentist
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link 
              to="/" 
              className={`${
                location.pathname === '/' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/guide/getting-started" 
              className={`${
                location.pathname.startsWith('/guide/') 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Guide
            </Link>
            <Link 
              to="/guides" 
              className={`${
                location.pathname === '/guides' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Guide Directory
            </Link>
            <Link 
              to="/contact" 
              className={`${
                location.pathname === '/contact' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Contact
            </Link>
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary-dark text-white font-medium">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary transition-colors p-2"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white border-b border-gray-100`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className={`${
              location.pathname === '/' 
                ? 'bg-primary/5 text-primary' 
                : 'text-gray-600 hover:bg-gray-50'
            } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/guide/getting-started" 
            className={`${
              location.pathname.startsWith('/guide/') 
                ? 'bg-primary/5 text-primary' 
                : 'text-gray-600 hover:bg-gray-50'
            } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Guide
          </Link>
          <Link 
            to="/guides" 
            className={`${
              location.pathname === '/guides' 
                ? 'bg-primary/5 text-primary' 
                : 'text-gray-600 hover:bg-gray-50'
            } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Guide Directory
          </Link>
          <Link 
            to="/contact" 
            className={`${
              location.pathname === '/contact' 
                ? 'bg-primary/5 text-primary' 
                : 'text-gray-600 hover:bg-gray-50'
            } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            to="/signup" 
            className="block w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            <Button className="w-full bg-primary hover:bg-primary-dark text-white font-medium">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;