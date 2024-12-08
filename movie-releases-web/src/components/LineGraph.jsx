import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getActorAnalyticDetails } from "../services/apiCalls";

const LineGraph = ({ actorName }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    // Fetch actor's movie data
    const fetchActorData = async () => {
      try {
        const response = await getActorAnalyticDetails(actorName)
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchActorData();
  }, [actorName]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={movieData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" label={{ value: "Month", position: "insideBottomRight", offset: -5 }} />
          <YAxis label={{ value: "Movies Count", angle: -90, position: "insideLeft" }} allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="cardinal" dataKey="movieCount" stroke="black" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
