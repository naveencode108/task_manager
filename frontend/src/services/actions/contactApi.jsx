import { toast } from "react-hot-toast";
import { apiCall } from "../apiCall";
import { setContact } from "../../slices/contactSlice";

export const createContact = async (data, dispatch, token, contact) => {
  try {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    let res = await apiCall("POST", "/api/v1/contact/create", data, header);

    if (res.data.success) {
      toast.success(res.data.message);
      dispatch(setContact([...contact, res.data.data]));
    }
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const editContact = async (data, dispatch, token, contact, id) => {
  try {
    let header = {
      Authorization: `Bearer ${token}`,
    };
    data.id = id;
    let res = await apiCall(
      "PATCH",
      "/api/v1/contact/edit_contact",
      data,
      header
    );

    if (res.data.success) {
      let val = contact.map((item) => {
        if (item._id == res.data.data._id) {
          return {
            ...item,
            name: res.data.data.name,
            phone: res.data.data.phone,
            email: res.data.data.email,
          };
        }
        return item;
      });
      dispatch(setContact(val));
      toast.success(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const deleteContact = async (id, dispatch, contact) => {
  try {
    let res = await apiCall("DELETE", "/api/v1/contact/delete_contact", { id });

    if (res.data.success) {
      let filterContact = contact.filter((item) => item._id != id);
      dispatch(setContact(filterContact));
      toast.success(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const getAllContact = async (token, dispatch) => {
  try {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    let res = await apiCall("GET", "/api/v1/contact/get_contact", null, header);

    if (res.data.success) {
      dispatch(setContact(res.data.data));
    }
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};
