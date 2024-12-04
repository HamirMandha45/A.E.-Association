import express from 'express'
import { authenticateToken } from '../middleware/auth.middleware.js';
import { deletePdf, uploadPdf } from '../controllers/pdfupload.controller.js';
import { upload } from '../middleware/fileupload.middleware.js';

const router = express.Router();

router.post('/uploadPdf',upload.fields([{name:'pdf'}]),authenticateToken,uploadPdf)
router.post('/deletePdf',authenticateToken,deletePdf)

export{
    router
}