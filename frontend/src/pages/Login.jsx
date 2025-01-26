import React from "react";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from 'react-router-dom';
import { loginUser } from "../services/actions/authApi";
import {useDispatch} from 'react-redux'

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const onSubmit = (data) => {
    loginUser(data,dispatch,navigate);
    reset();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 rounded-xl shadow-lg p-5 bg-white flex flex-col items-center gap-7">
        <h1 className="text-center text-2xl font-semibold capitalize text-gray-700 ">
          Login to your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-7 ">
          <div className="w-full">
            <label className="block text-sm text-gray-700">Email</label>
            <input
              className="w-full p-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-orange-400"
              type="text"
              placeholder="Enter email here"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <span className="text-sm text-red-500">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className="w-full">
            <label className="block text-sm text-gray-700">Password</label>
            <input
              className="w-full p-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-orange-400"
              type="password"
              placeholder="Enter password here"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters long",
                },
              })}
            />
            <span className="text-sm text-red-500">
              {errors.password && errors.password.message}
            </span>
          </div>

          <button className="bg-orange-500 w-full text-white px-2 py-2 rounded-md">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to='/signup' className="text-orange-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
