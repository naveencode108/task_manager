import { toast } from "react-hot-toast";
import { apiCall } from "../apiCall";
import {setLoading, setTask} from '../../slices/task';

export const addTask = async (data, token,alltask,dispatch) => {
  try {
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    let res = await apiCall("POST", "/api/v1/task/add_task", data, headers);

    if (res.data.success) {
      dispatch(setTask([...alltask,res.data.data]))
      toast.success(res.data.message);
    }
    else{
        toast.error(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
  }
};


export const getAlltask=async(token,dispatch)=>{
    try{
      dispatch(setLoading(true));
       let headers={
         Authorization:`Bearer ${token}`
       }

       let res=await apiCall('GET','/api/v1/task/get_all_task',null,headers);

       if(res.data.success){
         dispatch(setLoading(false))
         dispatch(setTask(res.data.task))
       }
    }
    catch(er){
        toast.error(er.message);
    }
}
