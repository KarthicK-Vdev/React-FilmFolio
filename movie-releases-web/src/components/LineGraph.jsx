import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getActorAnalyticDetails, getMovieYear } from "../services/apiCalls";

const LineGraph = ({ actorName }) => {
  const [movieData, setMovieData] = useState([]);
  const [years, setYears] = useState([]);

  // Fetch all years
  useEffect(() => {
    const fetchingYear = async () => {
      try {
        const { data } = await getMovieYear();
        setYears(data);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };
    fetchingYear();
  }, []);

  // Fetch actor's movie data
  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const response = await getActorAnalyticDetails(actorName);
  
        console.log("Actor Data:", response.data);
        console.log("Years:", years);
  
        // Ensure year formats match by extracting the year property
        const allYearsData = years.map(({ year }) => {
          const foundYear = response.data.find(
            (item) => item.year === year // Compare years directly
          );
          return {
            year,
            movieCount: foundYear ? foundYear.movieCount : 0,
          };
        });
  
        setMovieData(allYearsData);
        console.log("Updated movieData:", allYearsData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
  
    if (years.length > 0) {
      fetchActorData();
    }
  }, [actorName, years]);
    
  // Monitor movieData updates for debugging
  useEffect(() => {
    console.log("Updated movieData:", movieData);
  }, [movieData]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={movieData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: "Year", position: "insideBottomRight", offset: -5 }}
          />
          <YAxis
            label={{ value: "Movies Count", angle: -90, position: "insideLeft" }}
            allowDecimals={false}
          />
          <Tooltip />
          <Legend />
          <Line
            type="cardinal"
            dataKey="movieCount"
            stroke="black"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
