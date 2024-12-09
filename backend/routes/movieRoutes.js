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
        console.log(error)
    }
})


route.get("/analytics", async (req, res) => {
  try {
    const yearStart = 2024; // Adjust based on the range you need
    const yearEnd = 2025;

    // Generate all months for the required range
    const allMonths = [];
    for (let year = yearStart; year <= yearEnd; year++) {
      for (let month = 1; month <= 12; month++) {
        allMonths.push({ year, month });
      }
    }

    // Aggregate movie data
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

    // Map aggregated results into the complete month range
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
    // console.log(moviesByMonthMapped)
    return res.json(moviesByMonthMapped);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.get("/analytics/actor/:name", async (req, res) => {
  try {
    const actorName = req.params.name;

    // Group movies by year and count the number of movies for each year
    const yearlyMovieReleases = await movieModel.aggregate([
      {
        $match: { actors: actorName }, // Match movies where the actor is listed
      },
      {
        $group: {
          _id: { year: { $year: "$releaseDate" } }, // Group by year
          movieCount: { $sum: 1 }, // Count movies
        },
      },
      {
        $sort: { "_id.year": 1 }, // Sort by year
      },
    ]);

    // Format the response
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
      { $unwind: "$actors" }, // Flatten the actors array
      { $group: { _id: null, uniqueActors: { $addToSet: "$actors" } } } // Collect unique actors
    ]);

    if (actors.length > 0) {
      res.json(actors[0].uniqueActors); // Send the array of unique actors
    } else {
      res.json([]); // Empty array if no actors found
    }
  } catch (error) {
    console.error("Error fetching actors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = route