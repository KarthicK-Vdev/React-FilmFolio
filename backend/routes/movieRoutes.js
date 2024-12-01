const express = require("express")
const route=express.Router()
const movieModel = require("../models/movieModel");
const yearModel = require("../models/yearModel");

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
            const date = new Date(movie.releaseDate)
            const releaseYear=date.getFullYear()
            const checkYear= await yearModel.findOne({year:releaseYear})
            if(!checkYear)
            {
                await yearModel.create({year:releaseYear})
            }
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

route.get("/year",async(req, res)=>{
    try {
        const year= await yearModel.find()
        if(year)
        {
            return res.json(year)
        }
        else
        {
            return res.json({
                message:"No year present"
            })
        }
    } catch (error) {
        
    }
})

module.exports = route