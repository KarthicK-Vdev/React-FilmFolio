const express = require("express")
const app=express();
const cors= require("cors")
const dotenv= require("dotenv")
dotenv.config()


app.use(express.json())
app.use(cors())

const db = require("./config")

const adminRoutes = require("./routes/adminRoutes")
const movieRoutes=require("./routes/movieRoutes")


app.use("/admin",adminRoutes)
app.use("/movie",movieRoutes)

app.use("/test",(req, res)=>{
    res.json("Server is working")
})
app.listen(process.env.PORT,()=>{
    console.log("Server is running on the port: "+process.env.PORT)
})