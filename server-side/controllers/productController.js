const User=require("../models/userModel")
const Product=require("../models/productModel")
const multer = require('multer');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });


exports.createItem = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user.type !== 'admin' || !user) {
      return res.status(401).json({ message: 'You are not allowed to add an item' });
    }

    // Upload image using multer
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading image:', err);
        return res.status(500).json({ message: 'Failed to upload image' });
      }

      const newItem = await Product.create({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        category: req.body.category,
        description: req.body.description,
        imagePath: req.file ? req.file.path : '', // Save the image path to the product document
      });

      return res.status(201).json({ message: 'Item added', data: newItem });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

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