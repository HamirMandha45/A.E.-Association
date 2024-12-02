import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const pdfUploadSchema = new mongoose.Schema({
    pdfName:{
        type:String,
        required:true,
        trim:true,
    },
    pdf:{
        type:String,
        required:true,
        trim:true
    },
    userId:{    
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register',
        required:true,
    },
    watchBy:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register',
        }
    ],
    likedBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Register',
        }
    ],
    downloadBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Register',
        }
    ],
    deletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register',
    },
}, {timestamps:true,strict:false})

pdfUploadSchema.plugin(mongoosePaginate);
const PdfUpload = mongoose.model('PdfUpload',pdfUploadSchema)
export default PdfUpload;