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
        const year= await yearModel.find().sort({year:1})
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
        console.log(error)
    }
})


route.get("/analytics", async (req, res) => {
  try {
    const yearStart = 2023; 
    const yearEnd = 2025;

    
    const allMonths = [];
    for (let year = yearStart; year <= yearEnd; year++) {
      for (let month = 1; month <= 12; month++) {
        allMonths.push({ year, month });
      }
    }
    const moviesByMonth = await movieModel.aggregate([
      {
        $group: {
          _id: { year: { $year: "$releaseDate" }, month: { $month: "$releaseDate" } },
          movieCount: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const moviesByMonthMapped = allMonths.map((month) => {
      const found = moviesByMonth.find(
        (data) => data._id.year === month.year && data._id.month === month.month
      );
      return {
        _id: { year: month.year, month: month.month },
        movieCount: found ? found.movieCount : 0,
      };
    });

    return res.json(moviesByMonthMapped);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

route.get("/analytics/:year", async (req, res) => {
  try {
    const year = parseInt(req.params.year);

    const allMonths = Array.from({ length: 12 }, (_, i) => ({
      year,
      month: i + 1,
      monthName: monthNames[i],
    }));

    const moviesByMonth = await movieModel.aggregate([
      {
        $match: {
          releaseDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { year: { $year: "$releaseDate" }, month: { $month: "$releaseDate" } },
          movieCount: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    const moviesByMonthMapped = allMonths.map((month) => {
      const found = moviesByMonth.find((data) => data._id.month === month.month);
      return {
        month: month.monthName,
        movieCount: found ? found.movieCount : 0,
      };
    });

    return res.json(moviesByMonthMapped);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.get("/analytics/actor/:name", async (req, res) => {
  try {
    const actorName = req.params.name;


    const yearlyMovieReleases = await movieModel.aggregate([
      {
        $match: { actors: actorName }, 
      },
      {
        $group: {
          _id: { year: { $year: "$releaseDate" } }, 
          movieCount: { $sum: 1 }, 
        },
      },
      {
        $sort: { "_id.year": 1 }, 
      },
    ]);

    const formattedResponse = yearlyMovieReleases.map((data) => ({
      year: data._id.year,
      movieCount: data.movieCount,
    }));

    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.get("/actors", async (req, res) => {
  try {
    const actors = await movieModel.aggregate([
      { $unwind: "$actors" }, 
      { $group: { _id: null, uniqueActors: { $addToSet: "$actors" } } } 
    ]);

    if (actors.length > 0) {
      res.json(actors[0].uniqueActors); 
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching actors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.delete("/delete/:id",async(req, res)=>{
  try {
    const movieId=req.params.id
    const deleteMovie= await movieModel.findByIdAndDelete(movieId)
    console.log(deleteMovie)
    if(deleteMovie)
    {
      return res.json({
        message:"deleted movie successfully"
      })
    }
    else
    {
      return res.json({
        message:"no movie found"
      })
    }
  } catch (error) {
    console.log(error)
  }
})

route.put("/edit/:id", async(req, res)=>{
  const id=req.params.id
  const {imageUrl, movieName, releaseDate, description, actors, director}=req.body
  try {
    const updatedMovie=await movieModel.findByIdAndUpdate(id, {imageUrl, movieName, releaseDate, description, actors, director}, {new: true})
    
    if(updatedMovie)
    {
      return res.json({
        message:"Updated movie successfully"
      })
    }
    else
    {
      return res.json({
        message:"movie not found"
      })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = route