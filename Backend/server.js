import express from 'express'
import {router as userRouter} from './routes/user.routes.js'
import { dbConnect } from './config/dbConnect.js';
import { router as adminRouter} from './routes/admin.route.js'
import { router as realUserRouter } from './routes/reasluser.user.js';
import { router as pdfRouter } from './routes/pdf.route.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1',userRouter);
app.use('/api/v1',adminRouter);
app.use('/api/v1',realUserRouter);
app.use('/api/v1',pdfRouter);
dbConnect();
app.listen(3000,()=>{
    console.log('app is runnig on 3000');
})