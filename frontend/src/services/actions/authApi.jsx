import { toast } from "react-hot-toast";
import { apiCall } from "../apiCall";
import { setToken, setUser } from "../../slices/auth";

export const loginUser = async (data, dispatch, navigate) => {
  try {
    let res = await apiCall("POST", "/api/v1/auth/login", data);

    if (res.data.success) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.data));
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.data));
      navigate("/");
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (er) {
    console.log(er.message);
    toast.error(er.message);
  }
};

export const signupUser = async (data, navigate) => {
  try {
    let res = await apiCall("POST", "/api/v1/auth/signup", data);
    if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
    }
    else{
        toast.error(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
  }
};

export const logoutUser = (dispatch, navigate) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
  toast.success("Logged out");
};
