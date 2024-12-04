import Register from "../models/register.user.schema.js";
import PdfUpload from "../models/upload.schema.js";
import { removeFromCloudinary, uploadPdfToCloud } from "../services/fileupload.services.js";

const uploadPdf = async(req,res)=>{
    // const pdf = req?.files[0]
    // console.log(req.files);
    try {
    const {userId} = req.body
    const files = req?.files;
    console.log(files.pdf)
    const uploadRes = await Promise.all(
    files?.pdf?.map(async (file,index)=>{
        console.log(file);
        
        let pdf={};
        pdf.pdfName = file.originalname;
        pdf.userId = userId;
        const cloudRes = await uploadPdfToCloud(file.path,'pdfUploads')
        // file.
        pdf.pdf = cloudRes.url;
        pdf.pdf_id = cloudRes.public_id;
        
        const uploadedPdf = new PdfUpload(pdf);
        await uploadedPdf.save();
        return uploadedPdf;
    })
);
    return(
        res.status(200).json({
            message:'pdf uploaded successfully',
            success:true,
            uploadRes,
        })
    )
    
        
    } catch (error) {
        console.log(error);
        return(
            res.status(200).json({
                message:'failed to upload pdf',
                success:false,
                error,
            })
        )
    }
}

const deletePdf = async(req,res)=>{
    const {pdfDelete} = req.body;
    const {user} = req.body;
    const userRole = await Register.findOne({_id:user._id});
    if(userRole?.role!=='admin'){
        return (
            res.status(401).json({
                message:'only admin can delete pdf',
                success:false,
            })
        )
    }
    let cnt=0;
    const deletedPdfs = await Promise.all(
        pdfDelete.map(async(item,index)=>{
        const deletedPdf = await PdfUpload.findByIdAndDelete(item._id);
        if (deletedPdf) {
            cnt++;
            console.log(deletedPdf)
            const deleteFromCloud = await removeFromCloudinary(item.pdf_id);
            return deletedPdf;
        }
    })
)
if(cnt==0){
    return(
        res.status(404).json({
            message:'No Pdf Found to delete',
            success:false
        })
    )
}

return (
    res.status(200).json({
        message:'pdf deleted successfully',
        success:true,
        deletedPdfs,
    })
)
}

export {
    uploadPdf,
    deletePdf
}