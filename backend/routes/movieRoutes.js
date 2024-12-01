const express = require("express")
const route=express.Router()
const movieModel = require("../models/movieModel")

route.post("/add",async(req, res)=>{
    const movie = req.body;
    try {
        const movieExist= await movieModel.findOne({movieName:movie.movieName})
        if(movieExist)
        {
            return res.json({
                message:"movie already exist",
            })
        }
        else
        {
            const addMovie = await movieModel.create({
                imageUrl:movie.imageUrl,
                movieName:movie.movieName,
                releaseDate:movie.releaseDate,
                description:movie.description,
                actors: movie.actors,
                director:movie.director,
            })
            return res.json({
                message:"added movie"
            })
        }
    } catch (error) {
        console.log(error)
    }
    
})

route.get("/list",async(req, res)=>{
    try {
        const movieList = await movieModel.find()
        if(movieList)
        {
            return res.json(movieList)
        }
        else 
        {
            return res.json({
                message:"No movies there"
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = route