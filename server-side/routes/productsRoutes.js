const express=require("express")
const router=express.Router()
const productController=require("../controllers/productController")

router.post("/createItem",productController.createItem)
router.post("/deleteItem",productController.deleteItem)
router.post("/addItem",productController.addItem)
router.post("/removeItem",productController.removeItem)


module.exports=router