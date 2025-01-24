import mongoose from 'mongoose';


export const connectDB=async()=>{
    try{
      await mongoose.connect(process.env.MONGO_URI);
      console.log("DB is connected..");
    }
    catch(er){
        console.log(er.message);
    }
}