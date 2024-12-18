import express from 'express';
const router = express.Router();
import * as UserController from '../app/controllers/UserController.js';
import authMiddleware from "../app/middlewares/authMiddleware.js";



router.get('/Registration',UserController.Registration)
router.get('/Login',UserController.Login)
router.get('/ProfileRead',authMiddleware,UserController.SingleUserProfileRead)
router.get('/ProfileRead/allUser',UserController.AllUserProfileRead)
router.get('/ProfileUpdate',authMiddleware,UserController.ProfileUpdate)
router.get('/ProfileDelete/:user_id',UserController.ProfileDelete)




export default router;

