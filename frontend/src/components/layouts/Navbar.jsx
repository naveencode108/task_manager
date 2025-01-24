import React from "react";
import { SiTask } from "react-icons/si";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="text-black bg-gray-100 py-3 shadow-md border-black border-b-[1px]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold  text-orange-400 flex items-center">Tasker <SiTask className='animate animate-pulse' /></h1>
        <div className="space-x-6">
          <Link to="/" className="">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
