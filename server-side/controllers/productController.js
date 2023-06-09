const User=require("../models/userModel")
const Product=require("../models/productModel")


exports.createItem=async(req,res)=>{
    try{
        const email=req.body.email 
        const user=await User.findOne({email:email})
        if (user.type!=="admin" || !user){
            return res.status(401).json({message:"you are not allowed to add an item"})
        }
            const newItem=await Product.create({
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

exports.deleteItem=async(req,res)=>{
    try{
        const email=req.body.email 
        const user=await User.findOne({email:email})
        if (user.type!=="admin" || !user){
            return res.status(401).json({message:"you are not allowed to delete an item"})
        }

        const item=req.body.id
        const findItem=await Product.findById(item)
        if(!findItem){
            return res.status(401).json({message:"item does not exist"})
        }
        else{

        const deletedItem=await Product.findByIdAndDelete(item)
        return res.status(200).json({ message: "Item deleted successfully" });

        }

    }
    catch(err){
        console.log(err)
    }
}

exports.addItem = async (req, res) => {
    try {
      const userId = req.body.userID;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      const productId = req.body.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(401).json({ message: "Item not found" });
      }
  
      const existingItem = user.cart.find((item) => item.product.toString() === productId);
      if (existingItem) {
        existingItem.count += 1;
        user.totalBalance=user.totalBalance+product.productPrice
      } else {
        user.cart.push({ product: productId, count: 1 });
        user.totalBalance=user.totalBalance+product.productPrice

      }
  
      await user.save();
  
      return res.status(200).json({ message: "Item added to cart successfully" });
    } catch (err) {
      console.log(err);
    }
  };
  
  exports.removeItem = async (req, res) => {
    try {
      const userId = req.body.userID;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      const productId = req.body.id;
      const itemIndex = user.cart.findIndex((item) => item.product.toString() === productId);
  
      if (itemIndex === -1) {
        return res.status(401).json({ message: "Item not found in cart" });
      }
  
      if (user.cart[itemIndex].count === 1) {
        const product=await Product.findById(productId)
        user.cart.splice(itemIndex, 1);
        user.totalBalance=user.totalBalance-product.productPrice
        await user.save();
        return res.status(200).json({ message: "Item removed from cart successfully" });
      } else {
        const product=await Product.findById(productId)
        user.cart[itemIndex].count -= 1;
        user.totalBalance=user.totalBalance-product.productPrice
        await user.save();
        return res.status(200).json({ message: "Item count decremented successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  };