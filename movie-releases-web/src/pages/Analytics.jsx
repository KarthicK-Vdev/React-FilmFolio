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
import AreaGraph from '../components/AreaGraph';
import BarGraph from '../components/BarGraph';

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
    <div className='h-full w-full flex flex-col justify-center items-center overflow-y-auto'>
      <div className='h-[90%] w-[100%] flex flex-col items-center'>
        <div className='w-[80%] h-full'>
          <h1 className='text-xl font-semibold'>FilmFolio Analytics</h1>
          <AreaGraph data={formattedData} />
        </div>
        <div className=' w-[80%]'>
          <BarGraph year={2024}/>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
