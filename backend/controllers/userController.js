import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    try {

        let { email, password } = req.body;

        if(!email||!password) return res.json({success:false,message:'All fields are required'});

        let user = await User.findOne({ email });

        if (!user) return res.json({ success: false, message: "Invalid email or password" });

        let match = await user.comparePassword(password);

        if (!match) return res.json({ success: false, message: "Invalid email or password" });

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.json({
            success: true,
            data: {
                id:user._id,
                name:user.name,
                email:user.email
            },
            token,
            message:'Logged In'
        })

    } catch (er) {
        return res.json({ success: false, message: er.message });
    }
}

export const signupUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        if(!name||!email||!password)  return res.json({ success: false, message: "All field are required" });

        let isExist = await User.findOne({ email });
        if (isExist) return res.json({ success: false, message: "Invalid email or password" });

        let user= await User.create({
            name,
            email,
            password
        })
        
        return res.json({ success: true, message: "User created" })

    } catch (error) {
        return res.json({ success: false, message: er.message });
    }
}

export const logoutUser = (req, res) => {
     
}