const User=require("../models/userModel")
const Porduct=require("../models/productModel")


exports.createItem=async(req,res)=>{
    try{
        const email=req.body.email 
        const user=await User.findOne({email:email})
        if (user.type!=="admin" || !user){
            return res.status(401).json({message:"you are not allowed to add an item"})
        }
            const newItem=await Porduct.create({
            productName:req.body.productName,
            productPrice:req.body.productPrice,
            category:req.body.category,
            description:req.body.description
        }) 
        
        return res.status(201).json({message:"item added",data:newItem})
    }        

    catch(err){
        console.log(err)
    }
}