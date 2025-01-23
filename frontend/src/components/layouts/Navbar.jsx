import React from 'react';
import { logoutUser } from '../../services/actions/userApi';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {token}=useSelector(state=>state.user);

  return (
    <div className="w-full py-2 bg-gray-800 border-b-[1px] border-black text-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold tracking-wide">Contactss</h1>
        
        {/* Logout Button */}
        {token&&
        <button onClick={()=>logoutUser(dispatch,navigate)} className="bg-gray-700 hover:bg-gray-900 transition-all duration-150  px-4 py-2 rounded-md font-medium">
          Logout
        </button>
        }
      </div>
    </div>
  );
};

export default Navbar;
