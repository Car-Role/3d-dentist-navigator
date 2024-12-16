import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../components/TopNav';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <Outlet />
    </div>
  );
};

export default RootLayout; 