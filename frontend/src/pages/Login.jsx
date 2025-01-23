import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/actions/userApi";
import {useDispatch} from 'react-redux';

const Login = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm();

  const dispatch=useDispatch();
  const navigate=useNavigate();
 
  const onSubmit = (formData) => {
    loginUser(formData,dispatch,navigate);
    reset();
  };

  return (
    <div className="w-full h-screen bg-gray-700 flex justify-center items-center">
      <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-center text-2xl font-semibold text-gray-100 mb-6">
          Login Here
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-2 w-full px-4 py-2  bg-gray-700 text-white  outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
            <span className="text-sm text-red-500">
              {errors.email && errors.email.message}
            </span>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-2 w-full px-4 py-2 bg-gray-700  outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
            />
            <span className="text-sm text-red-500">
              {errors.password && errors.password.message}
            </span>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
