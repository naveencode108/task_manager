import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAlltask } from "../../../services/actions/taskApi";
import { PieChart } from '@mui/x-charts/PieChart';
import {
  FaTasks,
  FaSpinner,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const UserDashboard = () => {
  const { alltask } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getAlltask(token, dispatch);
  }, [token, dispatch]);

  const taskStats = [
    {
      label: "Total Tasks",
      count: alltask?.length || 0,
      icon: <FaTasks className="text-blue-500 text-4xl" />,
    },
    {
      label: "In Progress",
      count:
        alltask?.filter((item) => item.status === "in-progress").length || 0,
      icon: <FaSpinner className="text-yellow-500 text-4xl" />,
    },
    {
      label: "Completed",
      count: alltask?.filter((item) => item.status === "completed").length || 0,
      icon: <FaCheckCircle className="text-green-500 text-4xl" />,
    },
    {
      label: "Pending",
      count: alltask?.filter((item) => item.status === "pending").length || 0,
      icon: <FaHourglassHalf className="text-red-500 text-4xl" />,
    },
  ];

  return (
    <div className="w-full h-screen p-1 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        User Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taskStats.map((stat, index) => (
            <div
              key={index}
              className="flex justify-around w-60 py-10 bg-white shadow-md rounded-md p-4 border border-gray-200"
            >
              <div>
                <h2 className="text-xl font-medium text-gray-700">
                  {stat.label}
                </h2>
                <p className="text-3xl font-bold text-blue-500">{stat.count}</p>
              </div>
              {stat.icon}
            </div>
          
        ))}
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: taskStats[0].count, label:taskStats[0].label  },
                { id: 1, value: taskStats[1].count, label:taskStats[1].label  },
                { id: 2, value: taskStats[2].count, label:taskStats[2].label  },
                { id: 3, value: taskStats[3].count, label:taskStats[3].label  },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
