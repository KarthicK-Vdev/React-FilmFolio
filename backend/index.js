const express = require("express")
const app=express();
const cors= require("cors")
const dotenv= require("dotenv")
dotenv.config()


app.use(express.json())
app.use(cors())

const db = require("./config")

const adminRoutes = require("./routes/adminRoutes")


app.use("/admin",adminRoutes)

app.use("/test",(req, res)=>{
    res.json("Server is working")
})
app.listen(process.env.PORT,()=>{
    console.log("Server is running on the port: "+process.env.PORT)
})