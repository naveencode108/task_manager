import 'dotenv/config';
import express, { urlencoded } from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import userRoute from './routes/userRoutes.js'
import contactRoute from './routes/contactRoutes.js'
const app=express();
connectDb();

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/user',userRoute);
app.use('/api/v1/contact',contactRoute);

app.listen(3000,()=>{
   console.log('server is running..')
})

