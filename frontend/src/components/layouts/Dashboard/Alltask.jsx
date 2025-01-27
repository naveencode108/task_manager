import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlltask } from "../../../services/actions/taskApi";
import { FaExclamationCircle, FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import FilterTask from "../../common/FilterTask";

const Alltask = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { alltask, loading } = useSelector((state) => state.task);

  useEffect(() => {
    getAlltask(token, dispatch);
  }, [token, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center border-b-2">
        All Tasks
      </h1>

      <FilterTask status={''}/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
        {alltask?.map((task, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow-lg flex flex-col justify-between gap-4 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            {/* title and description */}
            <div className="mb-2">
              <h2 className="text-xl capitalize font-semibold text-gray-800 mb-1">
                {task.title}
              </h2>
              <p className="text-gray-600 line-clamp-4">{task.description}</p>
            </div>

            {/* edit and delete */}
            <div className="flex justify-between items-center ">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <time dateTime={task.date}>
                  {new Date(task.dueDate).toLocaleDateString()}
                </time>
              </div>

              <div>
                <p
                  className={`font-medium capitalize ${
                    task.priority === "low"
                      ? "text-green-500"
                      : task.priority === "medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  <span className="text-4xl">.</span>
                  {task.priority}
                </p>
              </div>

              <div className="flex gap-3">
                <button className="text-gray-600" title="View Details">
                  <FaExclamationCircle size={18} />
                </button>
                <button className="   text-yellow-600 " title="Edit Task">
                  <FaRegEdit size={18} />
                </button>
                <button className=" text-red-600 " title="Delete Task">
                  <MdOutlineDelete size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alltask;
