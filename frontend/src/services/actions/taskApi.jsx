import { toast } from "react-hot-toast";
import { apiCall } from "../apiCall";
import { setLoading, setTask } from "../../slices/task";

export const addTask = async (data, token, alltask, dispatch) => {
  try {
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    let res = await apiCall("POST", "/api/v1/task/add_task", data, headers);

    if (res.data.success) {
      dispatch(setTask([...alltask, res.data.data]));
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
  }
};

export const getAlltask = async (token, dispatch) => {
  try {
    dispatch(setLoading(true));
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    let res = await apiCall("GET", "/api/v1/task/get_all_task", null, headers);

    if (res.data.success) {
      dispatch(setLoading(false));
      dispatch(setTask(res.data.task));
    }
  } catch (er) {
    toast.error(er.message);
  }
};

export const updateTask = async (token, dispatch, alltask, data) => {
  try {
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let res = await apiCall("PUT", "/api/v1/task/update_task", data, headers);

    if (res.data.success) {
      let newTask = res.data.data;
      const filterTask = alltask.map((item) => {
        return item._id == newTask._id
          ? {
              ...newTask,
            }
          : item;
      });
      dispatch(setTask(filterTask));
      toast.success(res.data.message);
    } else {
      toast.success(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const markImportantTask = async (token,taskid,dispatch,alltask) => {
  try {
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let res = await apiCall("POST", "/api/v1/task/mark_important", {taskid}, headers);
   
    if (res.data.success) {      
       let val=res.data.data;
       console.log(val);
       let filter=alltask.map((item)=>{
           return item._id==taskid?{...val}:item
       })
       dispatch(setTask(filter));
      toast.success(res.data.message);
    } else {
      toast.success(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const deleteTask=async(token,dispatch,taskid,alltask)=>{
   try {
     let headers={
       Authorization:`Bearer ${token}`
     }

     let res=await apiCall('POST','/api/v1/task/delete_task',{taskid},headers);

     if(res.data.success){
        let filterdata=alltask.filter(item=>item._id!=taskid);
        dispatch(setTask(filterdata));
        toast.success(res.data.message);
      }
      else{
       toast.error(res.data.message);
     }

   } catch (er) {
     toast.error(er.message);
   }
}



