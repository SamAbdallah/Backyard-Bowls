const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema= new mongoose.Schema(
    {

      fullName:{
        type:String,
        required:[true,"please enter full name"]
      },
      email:{
        type:String,
        required:[true,"please enter email"],
        trim:true,
        unique:true,
        lowercase:true
      },
      password:{
        type:String,
        trim:true,
        minLength:8
      },

      passwordConfirm:{
        type:String,
        trim:true,
        minLength:8
      },

      type:{
        type:string,
        required:true
      },
      isVerified:{
        type:Boolean,
        default:false
      },

      passwordChangedAt:Date,
      passwordResetToken:String,
      passwordResetTokenExpires:Date,

      validatedAt:Date,
      validationToken:String,
      validationExpires:Date

    },
    {timestamps:true}
)