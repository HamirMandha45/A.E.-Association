import mongoose from 'mongoose'
import mongoosePaginate, { paginate } from 'mongoose-paginate-v2'
const userSchema = new mongoose.Schema({
    profilePic:{
        type:String,
        required:true,
        trim:true,
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    midleName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    phoneNumber:{
        type:String,
        requered:true,
        trim:true,
        max:[10,'phone number must be a 10'],
        min:[10,'phone number must be a 10'],
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    dateOfBirth:{
        type:String,
        // required:true,
        trim:true,
        default:Date.now,
    },
    graduate:{
        type:Date,
        // requered:true,
        default:Date.now,
        trim:true,
    },
    masters:{
        type:Date,
        // required:true,
        default:Date.now,
        trim:true,
    },
    department:{
        type:String,
        required:true,
        trim:true,
        enum:['r&b','irrigation'],
    },
    divisionName:{
        type:String,
        required:true,
        trim:true,
    },
    subDivisionName:{
        type:String,
        required:true,
        trim:true,
    },
    circlename:{
        type:String,
        required:true,
        trim:true,
    },
    receiptNumber:{
        type:String,
        required:true,
        trim:true,
    },
    paymentProof:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        required:true,
        trim:true,
        enum:['user','admin','register'],
        default:'user',
    },
},{timestamps:true,strict:false});

userSchema.plugin(paginate)
const User = mongoose.model("User",userSchema);
export default User;