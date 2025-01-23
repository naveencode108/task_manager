import toast from "react-hot-toast";
import { apiCall } from "../apiCall";
import { setToken, setUser } from "../../slices/userSlice";

export const loginUser = async (data, dispatch, navigate) => {
  try {
    let res = await apiCall("POST", "/api/v1/user/login", data);
    if (res.data.success) {
      toast.success(res.data.message);
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.data));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const signupUser = async (data, navigate) => {
  try {
    let res = await apiCall("POST", "/api/v1/user/signup", data);

    if (res.data.success) {
      navigate("/login");
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const logoutUser = async (dispatch,navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(setToken(null));
  dispatch(setUser(null));
  navigate('/login');
  toast.success("Logged out");
};
