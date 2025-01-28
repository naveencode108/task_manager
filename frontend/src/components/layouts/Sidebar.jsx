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

  const sideBarData=[
    {
      title:'Dashboard',
      path:'/user_dashboard',
      icon:<FaTachometerAlt className="mr-3" />
    },
    {
      title:'All Task',
      path:'/all-task',
      icon: <FaTasks className="mr-3" />
    },
    {
      title:'Completed Task',
      path:'/complete-task',
      icon: <FaCheckCircle className="mr-3" />
    },
    {
      title:'Pending Task',
      path:'/pending-task',
      icon:<FaHourglass className="mr-3" />
    },
    {
      title:'Important Task',
      path:'/important-task',
      icon:<FaExclamationCircle className="mr-3" />
    },
    {
      title:'InProgress Task',
      path:'/in-progress-task',
      icon:<FaTachometerAlt className="mr-3" />
    }
  ]
 

  return (
    <div className="h-full  bg-gray-100 text-black w-64 flex flex-col py-6 px-4 justify-between shadow-lg">
      <nav className="space-y-4 px-2 py-2 border border-orange-400">
        <h1 className="text-2xl font-bold mb-6 text-center text-black border-b-black border-b-[1px]">
          Actions
        </h1>
         {sideBarData.map((item,index)=>(
           <Link
           key={index}
           to={item.path}
           className="flex items-center py-2 focus:bg-orange-500 focus:text-white px-4 rounded-md hover:bg-orange-500 hover:text-white transition ease-in"
           >
           {item.icon}
           {item.title}
        </Link>
        ))}
      </nav>

      <button onClick={()=>logoutUser(dispatch,navigate)} className="px-3 flex items-center justify-center py-2 bg-orange-500  transition-all ease-in rounded-full hover:text-white">
        <CiLogout className="size-5"/>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
