import express from 'express'

import { deleteRegistration, getRegistrations, registrationRequest, updateRegistration } from '../controllers/register.controller.js'
import { upload } from '../middleware/fileupload.middleware.js';

const router = express.Router();

router.post('/register',upload.fields([
    {name:'profilePic',maxCount:1},
    {name:'paymentProof',maxCount:1}
]),registrationRequest)
router.get('/registrations',getRegistrations)
router.delete('/registrationDelete/:id',deleteRegistration);
router.put('/updateRegistration/:id',updateRegistration);
// router.post('/user',registerUser)
export{
    router
}