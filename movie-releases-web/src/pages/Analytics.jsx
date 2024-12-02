import React, { useEffect, useState, useMemo } from 'react';
import { getMovieAnalyticsData } from '../services/apiCalls';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Analytics = () => {
  const [analyticData, setAnalyticData] = useState([]);

  useEffect(() => {
    const fetchAnalyticData = async () => {
      try {
        const { data } = await getMovieAnalyticsData();
        console.log(data);
        setAnalyticData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };
    fetchAnalyticData();
  }, []);

  const formattedData = useMemo(
    () =>
      analyticData.map(item => ({
        month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
        movies: item.movieCount,
      })),
    [analyticData]
  );

  console.log("formatted data"+formattedData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      {formattedData.length > 0 ? (
        <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="movies" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      ) : (
        <div>Loading data...</div>
      )}
    </ResponsiveContainer>
  );
};

export default Analytics;
