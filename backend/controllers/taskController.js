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

    await userModel.findByIdAndUpdate(
      userId,
      { $push: { task: createTask._id } },
      { new: true }
    );

    return res.json({ success: true, message: "Task Added", data: createTask });
  } catch (er) {
    return res.json({ success: false, message: er.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    let { userId } = req;

    if (!userId)
      return res.json({
        success: false,
        message: "Something went wrong try again",
      });

    let { task } = await userModel
      .findOne({ _id: userId })
      .select("task")
      .populate("task");

    return res.json({ success: true, task: task });
  } catch (er) {
    return res.json({ success: false, message: er.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    let { userId } = req;
    let { taskid, title, description, date, priority, status } = req.body;

    if (!taskid)
      return res.json({ success: false, message: "Please Provide a taskId" });

    let findTask = await taskModel.findOne({ _id: taskid });

    if (!findTask)
      return res.json({ success: false, message: "Task not found" });

    if (title) {
      findTask.title = title;
    }
    if (description) {
      findTask.description = description;
    }
    if (date) {
      findTask.dueDate = date;
    }
    if (priority) {
      findTask.priority = priority;
    }
    if (status) {
      findTask.status = status;
    }

    await findTask.save();

    return res.json({ success: true, message: "Task Updated", data: findTask });
  } catch (er) {
    return res.json({ success: false, message: er.message });
  }
};

export const markImportantTask = async (req, res) => {
  try {
    let { taskid } = req.body;

    if (!taskid)
      return res.json({ success: false, message: "Please provide taskId" });

    let taskExist = await taskModel.findOne({ _id: taskid });

    if (!taskid) return res.json({ success: false, message: "Task not found" });

    taskExist.important = !taskExist.important;

    await taskExist.save();

    return res.json({
      success: true,
      data: taskExist,
      message: taskExist.important
        ? "Marked to important"
        : "Unmarked to important",
    });
  } catch (er) {
    return res.json({ success: false, message: er.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    let { userId } = req;
    let { taskid } = req.body;

    if (!taskid)
      return res.json({ success: false, message: "Please provide taskId" });

    let taskExist = await taskModel.findOne({ _id: taskid });

    if (!taskid) return res.json({ success: false, message: "Task not found" });

    await taskExist.deleteOne({ _id: taskid });

    let removeFromuser = await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { task: taskid },
      },
      { new: true }
    );

    return res.json({ success: true, message: "Task deleted" });
  } catch (er) {
    return res.json({ success: false, message: er.message });
  }
};
