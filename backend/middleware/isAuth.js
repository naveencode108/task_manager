import jwt from 'jsonwebtoken';


export const isAuth=(req,res,next)=>{
    let headers=req.headers.authorization;

    if(!headers) return res.json({success:false,message:"Invalid Token"});

    let token=headers.replace('Bearer','').trim();

    let {id}=jwt.verify(token,process.env.JWT_SECRET);
    
    req.userId=id;

    next();
}