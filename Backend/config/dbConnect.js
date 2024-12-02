import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const dbConnect = async()=>{
    try {
        const res = mongoose.connect(process.env.MONGODB_URL).then(()=>{
            console.log('database connected successfully');
        })
    } catch (error) {
        console.log('error in database connection');
    }
}

export{
    dbConnect
}