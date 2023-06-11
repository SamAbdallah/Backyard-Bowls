const mongoose=require('mongoose')
const Schema=mongoose.Schema
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



const productSchema= new mongoose.Schema(
    {
        productName:{
            type:String,
            required:[true,"Product name is required"],
            trim:true, 
            maxlength:50,
        },
        productPrice:{

            type:Number,
            trim:true,
            maxlength:[10,"too long price"]

        },
        category:{
            type:String,
            required:[true,"please enter category"]
        },
        description:{
            type:String,
            required:[true,"please enter description"]
        },
        imagePath: String,

        



    }
)

module.exports=mongoose.model("Product",productSchema)