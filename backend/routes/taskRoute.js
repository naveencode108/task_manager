import express from 'express';
import { addTask, getAllTask,markImportantTask,updateTask,deleteTask } from '../controllers/taskController.js';
import { isAuth } from '../middleware/isAuth.js';

const router=express.Router();


router.post('/add_task',isAuth,addTask);
router.get('/get_all_task',isAuth,getAllTask);
router.put('/update_task',isAuth,updateTask);

router.post('/mark_important',isAuth,markImportantTask);
router.post('/delete_task',isAuth,deleteTask);


export default router;