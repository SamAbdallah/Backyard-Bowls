const User=require("../models/userModel")
const validator=require("validator")
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const sendMail=require("../utils/emai").sendMail
const crypto=require("crypto")
dotenv.config()


const signToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

const createSendToken=(user,statusCode,res,msg)=>{
    const token=signToken(user._id)
    // res.status(statusCode).json({
    //     status:"success",
    //     msg,
    //     token,
    //     data:{
    //         user
    //     }
    // })
}
exports.signUp=async(req,res)=>{

    try{
        let email=req.body.email;
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid Email"})
        }

        const checkEmail=await User.findOne({email:req.body.email})
        if (checkEmail){
            return res.status(409).json({message:"email is already in use"})
        }

        let pass=req.body.password
        let passConfirm=req.body.passConfirm 
        if (pass!==passConfirm){
            return res.status(400).json({message:"passwords do not match"})
        }



        const newUser=await User.create({
            fullName:req.body.fullName,
            email:req.body.email,
            password:req.body.password,
            type:req.body.type
        })

        createSendToken(newUser,201,res,"user Created successfully!")

        this.validateToken(req,res,email)


    }

    catch(err){
        res.status(400).json({message:err.message})
    }
}


exports.validateToken=async(req,res,email)=>{
    let user=await User.findOne({email:email})

    try{   
        const validity=user.generateValidity()
        console.log(validity)
        await user.save({validateBeforeSave:false})

 
        const url=`${req.protocol}://${req.get("host")}/validateUser/${validity}`
        const msg=`validate your account uisng this link ${url}`
        try{
            await sendMail({
                receiver:req.body.email,
                subject:"your token valid for 10 minutes",
                content:msg,
            })
            return res.status(200).json({message:"it is done",data:user})


        }
        catch(err){
user.validationToken=undefined
user.validationExpires=undefined
await user.save({validateBeforeSave:false})
res.status(500).json({message:"error occured while sending"})
console.log(err)

        }

    }
    catch(err){
        console.log(err)

    }
}
exports.login=async(req,res)=>{
    const email=req.body.email 
    const password=req.body.password 
    let user= await User.findOne({email:email})
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    if(!await user.checkPassword(password,user.password)){
        return res.status(401).json({message:"passwords problem"})
    }

    return res.status(201).json({message:"user logged in"})


}

exports.validateUser=async(req,res)=>{
    try{
        const hashedToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
        const user=await User.findOne({validationToken:hashedToken,validationExpires:{$gt:Date.now()}})
        if (!user){
            return res.status(400).json({message:"token invalid or expired require a new one "})
        }

        user.isVerified=true
        user.validationToken=undefined
        user.validationExpires=undefined
        user.validatedAt=Date.now()
        await user.save()
        return res.status(200).json({message:"micheal jorden activated"})


    }
    catch(err){
        console.log(err)
    }
}

exports.forgotPassword=async(req,res)=>{
    try{        //check if user exists 


        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({message:"user with this email does not exist"})
        }
        //create the reset token

        const resetToken=user.generatePasswordResetToken()
        await user.save({validateBeforeSave:false})

        //send the token via email
        //link/reset token
        //create url
        const url=`${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`
        const msg=`Forgot password?reset bs visiting this link ${url}`
        try{
            await sendMail({
                receiver:user.email,
                subject:"your token valid for 10 minutes",
                content:msg,
            })
            res.status(200).json({status:"success",message:"reset link sent"})


        }
        catch(err){
user.passwordResetToken=undefined
user.passwordResetExpires=undefined
await user.save({validateBeforeSave:false})
res.status(500).json({message:"error occured while sending"})
console.log(err)

        }

    }
    catch(err){
        console.log(err)

    }
}


exports.resetPassword=async(req,res)=>{ 
    try{
        const hashedToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
        const user=await User.findOne({passwordResetToken:hashedToken})
        if(!user){
            return res.status(400).json({message:"token invalid or expired request a new one"})
        }
        if(req.body.password.length<8){
            return res.status(400).json({message:"password length too short"})

        }
        if(req.body.password!==req.body.passwordConfirm){
            return res.status(400).json({message:"password and pass confirm not the same"})

        }
        user.password=req.body.password
        user.passwordConfirm=req.body.passwordConfirm
        user.passwordResetToken=undefined
        user.passwordResetExpires=undefined
        user.passwordChangedAt=Date.now()
        await user.save()
        return res.status(200).json({message:"password changed successfully"})

    }
    catch(err){
        console.log(err)
    }
}