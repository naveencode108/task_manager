import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.json({ success: false, message: "All field are required" });

    let user = await userModel.findOne({ email });

    if (!user)
      return res.json({ success: false, message: "Invalid email or password" });

    let checkPass = await user.comparePassword(password);

    if (!checkPass)
      return res.json({ success: false, message: "Invalid email or  password" });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      message: "Logged In",
    });
  } catch (er) {
    return res.json({ success: false, message: er.message });
  }
};

export const signupUser = async (req, res) => {
    try {
        let {name,email,password}=req.body;

        if(!name||!email||!password) return res.json({success:false,message:'All field are required'});

        let isExist=await userModel.findOne({email});

        if(isExist) return res.json({success:false,message:'Something went wrong. Please try again later.'});

        await userModel.create({
            name,
            email,
            password
        });

        return res.json({success:true,message:"Account Created"});

    } catch (er) {
         return res.json({success:false,message:er.message});
    }
};


