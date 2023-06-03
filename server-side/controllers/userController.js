const User=require("../models/userModel")
const validator=require("validator")

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

    return res.status(201).json({message:"user created successfully",data:newUser})
}

    catch(err){
        console.log(err)
    }
}

exports.login=async(req,res)=>{
    const email=req.body.email 
    const password=req.body.password 
    let user=User.findOne({email:email})
    if(!user){
        return res.status(400).json({message:"user not found"})
    }

    
}