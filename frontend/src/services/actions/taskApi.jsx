import { toast } from "react-hot-toast";
import { apiCall } from "../apiCall";

export const addTask = async (data, token) => {
  try {
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    let res = await apiCall("POST", "/api/v1/task/add_task", data, headers);

    if (res.data.success) {
      toast.success(res.data.message);
    }
    else{
        toast.error(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
  }
};


export const getAlltask=async(token)=>{
    try{
       let headers={
         Authorization:`Bearer ${token}`
       }

       let res=await apiCall('GET','/api/v1/task/get_all_task',null,headers);
       console.log(res);
    }
    catch(er){
        toast.error(er.message);
    }
}
