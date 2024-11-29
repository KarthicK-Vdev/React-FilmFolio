const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true,
    },
    movieName:{
        type:String,
        required:true,
    },
    releaseDate:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    actors:{
        type:[String],
        required:true
    },
    director:{
        type:String,
        required:true
    }
})

const movieModel = mongoose.model("movies", movieSchema)

module.exports=movieModel