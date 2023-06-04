const User=require("../models/userModel")
const validator=require("validator")
const jwt=require('jsonwebtoken')

const signToken=(id)=>{
    return jwt.sign({id},api2.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

const createSendToken=(user,statusCode,res,msg)=>{
    const token=signToken(user._id)
    res.status(statusCode).json({
        status:"success",
        msg,
        token,
        data:{
            user
        }
    })
}

exports.signUp=async(req,res)=>{
    try{
        let email=req.body.email 
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid email"})
        }

        const checkEmail=await User.findOne({email:email})
        if(checkEmail){
            return res.status(409).json({message:"email already in use"})

        }

        let pass=req.body.password 
        let passConfirm=req.body.passConfirm
        if(pass!==passConfirm){
            return res.status(400).json({message:"passwords do not match"})

    }

    
    const newUser=await User.create({
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password,
        type:req.body.type
                
    })
    createSendToken(newUser,201,res,"user Created successfully!")


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