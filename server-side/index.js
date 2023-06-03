const express=require('express')
const app=express()
const DB=require('./database').connectDB
const authRoutes=require("./routes/authRoutes")

DB()
app.use(express.json())
require("dotenv").config()
app.use("",authRoutes)



app.listen(process.env.Port,()=>{
    console.log("listening on port 3000")
})