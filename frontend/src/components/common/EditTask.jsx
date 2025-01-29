import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {updateTask } from "../../services/actions/taskApi";
import { useDispatch, useSelector } from "react-redux";

const EditTask = ({ setOpen, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const { alltask } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    updateTask(token,dispatch,alltask,data);
    reset();
    setOpen(false);
  };

  useEffect(() => {
    setValue("title", data.title);
    setValue("description", data.description);
    setValue("priority", data.priority);
    const formattedDate = new Date(data.dueDate).toISOString().split("T")[0];
    setValue("date", formattedDate);
    setValue("status", data.status);
    setValue('taskid',data._id);
  }, [data, setOpen]);


  return (
    <div className="fixed z-40 inset-0 backdrop-blur-sm bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Edit Task</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter task title"
              className="w-full border rounded-lg p-2"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Enter task description"
              className="w-full border rounded-lg p-2"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Priority
            </label>
            <select
              className="w-full border rounded-lg p-2"
              {...register("priority", { required: "Priority is required" })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded-lg p-2"
              {...register("status", { required: "status is required" })}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in-progress">InProgress</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
            >
              Submit Task
            </button>
            <button
              onClick={() => {
                setOpen(false);
                reset();
              }}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
            >
              Close Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
