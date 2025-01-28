import React from "react";
import { deleteTask, markImportantTask } from "../../services/actions/taskApi";
import { FaExclamationCircle, FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const Card = ({task,token,dispatch,alltask,setOpen,setTask}) => {
  return (
    <div
      className="p-4 bg-white shadow-lg flex flex-col justify-between gap-4 rounded-lg border border-orange-300 hover:shadow-xl transition-shadow duration-300"
    >
      {/* title and description */}
      <div className="mb-2">
        <h2 className="text-xl capitalize font-semibold text-gray-800 mb-1">
          {task.title}
        </h2>
        <p className="text-gray-600 line-clamp-4">{task.description}</p>
      </div>

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
          <button
            onClick={() =>
              markImportantTask(token, task._id, dispatch, alltask)
            }
            className={`${task.important ? "text-red-600" : "text-gray-600"}  `}
            title="Important task"
          >
            <FaExclamationCircle size={18} />
          </button>
          <button
            onClick={() => {
              setOpen(true);
              setTask(task);
            }}
            className=" text-yellow-600 "
            title="Edit Task"
          >
            <FaRegEdit size={18} />
          </button>
          <button
            onClick={() => deleteTask(token, dispatch, task._id, alltask)}
            className=" text-red-600 "
            title="Delete Task"
          >
            <MdOutlineDelete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
