import userModel from "../models/userModel.js";
import taskModel from "../models/taskModel.js";

export const addTask = async (req, res) => {
  try {
    let { userId } = req;

    let { title, description, priority, date } = req.body;

    if (!title || !description || !priority || !date)
      return res.json({ success: false, message: "All field are required" });

    let createTask = await taskModel.create({
      title,
      description,
      priority,
      dueDate: date,
    });

    let user = await userModel.findByIdAndUpdate(
      userId,
      { $push: { task: createTask._id } },
      { new: true }
    );

    return res.json({ success: true, message: "Task Added", data: createTask });
  } catch (er) {
    return res.json({ success: false, message: er.message });
  }
};

export const getAllTask=async(req,res)=>{
    try{
       let {userId}=req;

       if(!userId) return res.json({success:false,message:"Something went wrong try again"});

       let tasks=await taskModel.find({});

       console.log(tasks);
       return res.json({success:true});

    }
    catch(er){
        return res.json({success:false,message:er.message});
    }
}
