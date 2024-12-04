import express from 'express'
import {router as userRouter} from './routes/user.routes.js'
import { dbConnect } from './config/dbConnect.js';
import { router as adminRouter} from './routes/admin.route.js'
import { router as realUserRouter } from './routes/reasluser.user.js';
import { router as pdfRouter } from './routes/pdf.route.js';
import https from 'https'
import path, { dirname } from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

dotenv.config();
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use('/api/v1',userRouter);
app.use('/api/v1',adminRouter);
app.use('/api/v1',realUserRouter);
app.use('/api/v1',pdfRouter);
dbConnect();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const options = {
    key:fs.readFileSync(path.join(__dirname,"localhost-key.pem")),
    cert:fs.readFileSync(path.join(__dirname,"localhost.pem")),
}
const server = https.createServer(options,app)
server.listen(process.env.PORT,()=>{
    console.log(`app is runnig on https://localhost:${process.env.PORT}`);
})