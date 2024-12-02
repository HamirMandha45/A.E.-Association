import PdfUpload from "../models/upload.schema.js";
import { uploadPdfToCloud } from "../services/fileupload.services.js";

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
            uploadRes,
        })
    )
    
        
    } catch (error) {
        console.log(error);
        return(
            res.status(200).json({
                message:'failed to upload pdf',
                error,
            })
        )
    }
}

export {
    uploadPdf
}