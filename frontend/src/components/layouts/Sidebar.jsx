import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaCheckCircle,
  FaHourglass,
  FaExclamationCircle,
} from "react-icons/fa"; // Import the icons
import { SiTask } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { logoutUser } from "../../services/actions/authApi";
import { useDispatch, useSelector } from "react-redux";


const Sidebar = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
 

  return (
    <div className="h-full  bg-gray-100 text-black w-64 flex flex-col py-6 px-4 justify-between shadow-lg">
      <nav className="space-y-4 px-2 py-2 border border-orange-400">
        <h1 className="text-2xl font-bold mb-6 text-center text-black border-b-black border-b-[1px]">
          Actions
        </h1>
        <Link
          to="/user_dashboard"
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-500 hover:text-white transition ease-in"
        >
          <FaTachometerAlt className="mr-3" /> {/* Dashboard Icon */}
          Dashboard
        </Link>

        <Link
          to="/all-task"
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-500 hover:text-white transition ease-in"
        >
          <FaTasks className="mr-3" /> {/* All Tasks Icon */}
          All Tasks
        </Link>

        <Link
          to="/complete-task"
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-500 hover:text-white transition ease-in"
        >
          <FaCheckCircle className="mr-3" /> {/* Complete Tasks Icon */}
          Complete Tasks
        </Link>

        <Link
          to="/pending-task"
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-500 hover:text-white transition ease-in"
        >
          <FaHourglass className="mr-3" /> {/* Pending Tasks Icon */}
          Pending Tasks
        </Link>

        <Link
          to="/important-task"
          className="flex items-center py-2 px-4 rounded-md hover:bg-orange-500 hover:text-white transition ease-in"
        >
          <FaExclamationCircle className="mr-3" /> {/* Important Tasks Icon */}
          Important Tasks
        </Link>
      </nav>

      <button onClick={()=>logoutUser(dispatch,navigate)} className="px-3 flex items-center justify-center py-2 bg-orange-500  transition-all ease-in rounded-full hover:text-white">
        <CiLogout className="size-5"/>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
