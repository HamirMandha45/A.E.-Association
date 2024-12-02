import Register from "../models/register.user.schema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const makeUser = async(req,res)=>{
    const {id} = req.params
    const updatedDate = {role:'user'};
    try {
        const user = await Register.findByIdAndUpdate(
            id,
            {$set:updatedDate},
            {new:true,runValidators:true},
        )
        if(!user){
            return(
                res.status(404).json({
                    message:'User Not Found',
                    success:false
                })
            )
        }
        return (
            res.status(200).json({
                message:'Registration confirmed',
                success:true,
                user,
            })
        )
    } catch (error) {
        return(
            res.status(400).json({
                message:'error in registration conformation',
                success:false
            })
        )
    }
}

const generateToken = async(user)=>{
    const token = jwt.sign(
        {
            _id:user._id,
            firstName:user.firstName,
        },
        process.env.JWT_SECRETE,
        {
            expiresIn:`${process.env.EXPIRES_IN}m`
        }
    );
    return token;
}
const login = async(req,res)=>{
    const{phoneNumber,password} = req.body
    // const token = req?.cookies?.token
    
    try {
        const user = await  Register.findOne({phoneNumber})
        if(!user){
            return(
                res.status(404).json({
                    message:'User not found',
                    success:false
                })
            )
        }
        if(user.role==='register'){
            return(
                res.status(206).json({
                    message:'Registration resived admin needs to aprove',
                    success:false
                })
            )
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return(
                res.status(401).json({
                    message:'Phone number or password is incorrect',
                    success:false
                })
            )
        }
            const token = await generateToken(user)
            return(
                res.status(200).cookie("token",token,{
                        httpOnly:true,
                        maxAge: 60*60*24* 1000
                    }).json({
                    message:'Login Done Successfully',
                    success:true,
                    user,
                })
            )
    } catch (error) {
        return(
            res.status(400).json({
                message:'Error in login',
                success:false
            })
        )
    }
}

const logout = async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:"strict"
        })
        return res.status(200).json({
            message:'logout Successfully',
            success:true
        })
    } catch (error) {
        return(
            res.status(500).json({
                message:'Error in login',
                success:false,
            })
        )
    }
}

export{
    makeUser,
    login,
    logout
}