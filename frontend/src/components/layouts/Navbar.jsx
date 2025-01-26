import React, { useState } from "react";
import { SiTask } from "react-icons/si";
import { useSelector } from "react-redux";
import AddTask from "../common/AddTask";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [open,setOpen]=useState(false);

  return (
    <nav className="bg-gray-100 text-black py-3 shadow-md border-b border-black">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-400 flex items-center">
          Tasker <SiTask className="ml-2 animate-pulse" />
        </h1>

        {/* Desktop Menu */}
        <div className="flex items-center space-x-6">
          <div className="text-sm text-gray-600">
            Welcome,{" "}
            <span className="font-semibold text-orange-500">{user?.name}</span>
          </div>
          <button onClick={()=>setOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-orange-400 text-white rounded-lg shadow-md hover:bg-orange-500 transition">
            <span>AddTask</span>
          </button>
        </div>
      </div>
      {open&&
      <AddTask setOpen={setOpen}/>
      }
    </nav>
  );
};

export default Navbar;
