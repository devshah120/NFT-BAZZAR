import express from 'express';
const router = express.Router();

import {getUserData, getUserDetails, login, logout, register, updateUser} from "../controllers/usercontroller.js";


router.post('/login', login);

router.post('/register', register);

router.get('/userdetails', getUserDetails)

router.post('/userupdate/:_id', updateUser)

router.post('/user/:MetaHash', getUserData)

router.get('/logout', logout)

export default router;
