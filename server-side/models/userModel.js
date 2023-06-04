const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcyrpt=require("bcrypt")
const crypto=require("crypto")

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
        type:String,
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

  userSchema.pre("save",async function(next){
    try{
      if(!this.isModified("password")){
        return next()
      }
      this.password=await bcyrpt.hash(this.password,12)
      this.passwordConfirm=undefined
    }

    catch(err){
      console.log(err)
    }
  })

  userSchema.methods.checkPassword=async function(candidatePassword,UserPassword){
    return bcyrpt.compare(candidatePassword,UserPassword)

}


userSchema.methods.generateValidity=function () {
  const validityToken=crypto.randomBytes(32).toString("hex") //will be sent via email
  this.validationToken=crypto.createHash("sha256").update(validityToken).digest("hex")
  this.validationExpires=Date.now()+10*60*1000 //10 min of validity
  return validityToken
}


module.exports=mongoose.model("User",userSchema)