import express from 'express';
import { createContact,getContact,deleteContact,editContact } from '../controllers/contactController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.post('/create',isAuth,createContact);

router.get('/get_contact',isAuth,getContact);

router.delete('/delete_contact',deleteContact)

router.patch('/edit_contact',isAuth,editContact);

export default router;