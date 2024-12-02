import cloudinary from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

const uploadToCloudinary = (path,folder,public_id)=>{    
    return cloudinary.v2.uploader.upload(path,{
        folder,
        public_id:public_id,
        overwrite:true,
        access_mode:'public',
    }).then((data)=>{
        return {url:data.url,public_id:data.public_id};
    }).catch((error)=>{
        console.log(error);
    })
}


const removeFromCloudinary = async(public_id)=>{
    try {
        const result = await cloudinary.v2.uploader.destroy(public_id)
        console.log('Deletion result',result);
        return result;
    } catch (error) {
        console.log('error in deletion',error);
        throw error;
    }
}

const uploadPdfToCloud = async(path,folder)=>{
    const timestamp = Date.now();
    const public_id = `${timestamp}`;
    return cloudinary.v2.uploader.upload(path,{
        folder,
        public_id:public_id,
        access_mode:'public',
    }).then((data)=>{
        return{url:data.url,public_id:data.public_id};
    }).catch((error)=>{
        console.log(error)
    })
}

export{
    uploadToCloudinary,
    removeFromCloudinary,
    uploadPdfToCloud,
}