const mongoose = require("mongoose")

const yearSchema = new mongoose.Schema({
    year:{
        type:Number,
        required:true,
    }
})

const yearModel = mongoose.model("years", yearSchema)

module.exports=yearModel