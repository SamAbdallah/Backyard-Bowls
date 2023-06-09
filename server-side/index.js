const express=require('express')
const app=express()
const DB=require('./database').connectDB
const authRoutes=require("./routes/authRoutes")
const productRoutes=require("./routes/productsRoutes")

DB()
app.use(express.json())
require("dotenv").config()
app.use("",authRoutes)
app.use("",productRoutes)




app.listen(process.env.Port,()=>{
    console.log("listening on port 3000")
})