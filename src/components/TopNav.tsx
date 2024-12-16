import React from 'react';
import { Menu } from 'lucide-react';

const TopNav = () => {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-primary">Dental 3D Printing Guide</h1>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <a href="#" className="text-secondary-dark hover:text-primary px-3 py-2 text-sm font-medium">
              Home
            </a>
            <a href="#" className="text-secondary-dark hover:text-primary px-3 py-2 text-sm font-medium">
              Resources
            </a>
            <a href="#" className="text-secondary-dark hover:text-primary px-3 py-2 text-sm font-medium">
              Community
            </a>
            <a href="#" className="text-secondary-dark hover:text-primary px-3 py-2 text-sm font-medium">
              Contact
            </a>
          </div>
          <div className="flex items-center sm:hidden">
            <button className="text-gray-500 hover:text-primary">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;