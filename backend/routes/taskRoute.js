import express from 'express';
import { addTask, getAllTask } from '../controllers/taskController.js';
import { isAuth } from '../middleware/isAuth.js';

const router=express.Router();


router.post('/add_task',isAuth,addTask);
router.get('/get_all_task',isAuth,getAllTask);


export default router;