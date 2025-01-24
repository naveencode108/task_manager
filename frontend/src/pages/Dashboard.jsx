import React from 'react';
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar className="hidden md:block w-64 bg-gray-800 text-white overflow-y-auto" />
        
        {/* Outlet (Main Content) */}
        <div className="flex-1 bg-white p-6 overflow-y-auto rounded-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
