import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaTasks, FaCheckCircle, FaHourglass, FaExclamationCircle } from 'react-icons/fa'; // Import the icons
import { SiTask } from "react-icons/si";


const Sidebar = () => {
  return (
    <div className="h-full bg-gray-100 text-black w-64 flex flex-col py-6 px-4 shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-black border-b-black border-b-[1px]">Actions</h1>
      
      <nav className="space-y-4 px-2 py-2 border border-orange-400">
        <Link 
          to="/user_dashboard" 
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-400 hover:text-white transition"
        >
          <FaTachometerAlt className="mr-3" /> {/* Dashboard Icon */}
          Dashboard
        </Link>

        <Link 
          to="/all-task" 
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-400 hover:text-white transition"
        >
          <FaTasks className="mr-3" /> {/* All Tasks Icon */}
          All Tasks
        </Link>

        <Link 
          to="/complete-task" 
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-400 hover:text-white transition"
        >
          <FaCheckCircle className="mr-3" /> {/* Complete Tasks Icon */}
          Complete Tasks
        </Link>

        <Link 
          to="/pending-task" 
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-400 hover:text-white transition"
        >
          <FaHourglass className="mr-3" /> {/* Pending Tasks Icon */}
          Pending Tasks
        </Link>

        <Link 
          to="/important-task" 
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-400 hover:text-white transition"
        >
          <FaExclamationCircle className="mr-3" /> {/* Important Tasks Icon */}
          Important Tasks
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
