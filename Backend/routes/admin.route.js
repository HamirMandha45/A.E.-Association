import express from 'express'
import {  makeUser } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.put('/makeUser/:id',authenticateToken
    ,makeUser)

export{
    router
}