import 'dotenv/config';
import express, { urlencoded } from 'express';
import cors from 'cors';
import authRoute from './routes/authRoute.js'
import taskRoute from './routes/taskRoute.js'
import {connectDB} from './config/db.js'

connectDB();

const app=express();

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/task',taskRoute)

app.listen(3000,()=>{
   console.log('server is running..')
})

