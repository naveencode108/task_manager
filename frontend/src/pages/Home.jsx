import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createContact, deleteContact, editContact, getAllContact } from "../services/actions/contactApi";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const { contact } = useSelector((state) => state.contact);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (isEdit) {
       let id=isEdit._id;
       editContact(data,dispatch,token,contact,id)
    } else {
      createContact(data, dispatch, token, contact);
    }
    reset();
    setOpen(false);
    setIsEdit(null);
  };

  const handleEdit = (data) => {
    setValue("name", data.name);
    setValue("mobile", data.phone);
    setValue("email", data.email);
    setIsEdit(data);
    setOpen(true);
  };

  useEffect(() => {
    getAllContact(token, dispatch);
  }, []);

  return (
    <div className="bg-gray-800 w-full min-h-screen text-white p-4 sm:p-10">
      {/* Add Contact Button */}
      <button
        onClick={() => {
          setOpen(!open);
          reset();
          setIsEdit(null);
        }}
        className="bg-blue-600 px-6 py-2 rounded-md text-white font-semibold hover:bg-blue-500 mb-6"
      >
        Add Contact
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 w-11/12 sm:w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Contact" : "Add New Contact"}
            </h2>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Name"
                    className="px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <span className="text-sm text-red-500">
                {errors.name && errors.name.message}
              </span>

              <Controller
                name="mobile"
                control={control}
                defaultValue=""
                rules={{
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Phone Number"
                    className="px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <span className="text-sm text-red-500">
                {errors.mobile && errors.mobile.message}
              </span>

              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Email"
                    className="px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <span className="text-sm text-red-500">
                {errors.email && errors.email.message}
              </span>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setOpen(false);
                    setIsEdit(null);
                  }}
                  className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-500"
                >
                  {isEdit ? "Edit" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
        <table className="table-auto w-full text-center">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone No</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contact && contact.length > 0 ? (
              contact.map((item, index) => (
                <tr
                  key={item._id}
                  className="bg-gray-800 hover:bg-gray-700 border-gray-900 border-t-[1px]"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteContact(item._id, dispatch, contact)}
                      className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No contacts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
