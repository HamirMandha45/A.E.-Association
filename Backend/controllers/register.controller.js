import { upload } from "../middleware/fileupload.middleware.js";
import Register from "../models/register.user.schema.js";
import { removeFromCloudinary, uploadToCloudinary } from "../services/fileupload.services.js";
import bcrypt from 'bcrypt'
const registrationRequest = async(req,res)=>{
    try {
        console.log('body-->',req.body)
        console.log('files-->',req.files)
        const data = req.body;
        const {phoneNumber} = req.body
        const {firstName} = req.body
        const folderName = `${phoneNumber}-${firstName}`
        if(phoneNumber){
            const isUser = await Register.findOne({phoneNumber:phoneNumber})
            if(isUser){
                return (
                    res.status(301).json({
                        message:'user already exist',
                        success:false,
                        isUser,
                    })
                )
            }
        }
        const profilePic = req.files['profilePic'] ? req.files['profilePic'][0]:null;
        const paymentProof = req.files['paymentProof'] ? req.files['paymentProof'][0]:null;
        if (!profilePic || !paymentProof) {
            return res.status(400).json({
                message: 'Both profilePic and paymentProof are required',
                success: false
            });
        }
        const {password} = req.body
        const {confirmPassword} = req.body
        if(password!=confirmPassword){
            return(
                res.status(304).json({
                    message:'password and confirm password should be same',
                    success:false,
                })
            )
        }   
        delete data.confirmPassword;
        const hashPass = await bcrypt.hash(password,parseInt(process.env.ENCRYPT_ROUND));
        
        // try {

            const profilePicResponse = await uploadToCloudinary(profilePic.path, `profile-images/${folderName}`, phoneNumber);
             const paymentProofResponse = await uploadToCloudinary(paymentProof.path, `payment-proofs/${folderName}`, phoneNumber);
        
            const newUser= new Register({
                ...data,
                profilePic:profilePicResponse.url,
                profilePicId:profilePicResponse.public_id,
                paymentProof:paymentProofResponse.url,
                paymentProofId:paymentProofResponse.public_id,
                password:hashPass,
                
            })
            await newUser.save();
            console.log('hello');
            return (
                res.status(200).json({
                    message:'user created succesfully',
                    success:true,
                    newUser,
                })
            )
        // } catch (error) {
            // console.log('error in cloudinary',error);
            // return(
            //     res.status(400).json({
            //         message:'error in file upload',
            //         success:false,
            //         error
            //     })
            // )
        // }
    } catch (error) {
        console.log('error in file fetching',error);
        return(
            res.status(401).json({
                message:'error in user creation',
                success:false,
                error,
            })
        )
    }
}

const deleteRegistration = async(req,res)=>{
    // const {_id} = req.body
    const {id} = req.params
    console.log(req.body);
    try {
        if(!id){
            return(
                res.status(400).json({
                    message:'provide required details to delete',
                    success:false
                })
            )
        }
        const user = await Register.findOneAndDelete({_id:id});
        if(!user){
            return(
                res.status(404).json({
                    message:'no user found to delete',
                    success:false,
                })
            )
        }
        const {profilePicId} = user
        const {paymentProofId} = user
        if(profilePicId){
            const profilePicDelete = await removeFromCloudinary(profilePicId)
        }
        if(paymentProofId){
            const paymentProofDelete = await removeFromCloudinary(paymentProofId)
        }
        return(
            res.status(200).json({
                message:'user deleted succesfully',
                success:true,
                user,
            })
        )
    } catch (error) {
        return(
            res.status(403).json({
                message:'error in user deletion',
                success:false,
            })
        )
    }
}

const getRegistrations = async(req,res)=>{
    const users =  await Register.find({});
    try {
        if(!users){
            return(
                res.status(404).json({
                    message:'no registration found',
                    success:false
                })
            )
        }
        return(
            res.status(201).json({
                message:'regitration found',
                success:true,
                users
            })
        )
    } catch (error) {
        return(
        res.status(400).json({
            message:'error in registration fetching',
            success:false
        })
    )
    }
}

const updateRegistration = async(req,res)=>{
    try {
        // const {_id} = req.body;
        const {id} = req.params
        const updatedData = req.body
        console.log('id = ',id)
        console.log(updatedData);
        const user = await Register.findByIdAndUpdate(
            id,
            {$set:updatedData},
            {new:true,runValidators:true}
        )
        // const user = 
        console.log('user',user)
        if(!user){
            return(
                res.status(404).json({
                    message:'user not found',
                    success:false
                })
            )
        }
        return(
            res.status(200).json({
                message:'user updated successfully',
                success:true,
                user
            })
        )
        
    } catch (error) {
        return(
            res.status(400).json({
                message:'error in registration updation',
                success:false
            })
        )
    }
}

export {
    registrationRequest,
    getRegistrations,
    deleteRegistration,
    updateRegistration,
}