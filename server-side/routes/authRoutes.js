const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")

router.post("/signUp",userController.signUp)
router.get("/login",userController.login)

module.exports=router