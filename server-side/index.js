const express=require('express')
const app=express()
const DB=require('./database').connectDB

DB()
app.use(express.json())
require("dotenv").config()


app.listen(process.env.Port,()=>{
    console.log("listening on port 3000")
})