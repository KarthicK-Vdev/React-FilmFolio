import React, { useEffect, useState, useMemo } from 'react';
import { getMovieAnalyticsData, getMovieYear } from '../services/apiCalls';
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
  const [movieYear, setMovieYear]=useState([])
  const [year, setYear]=useState(2024)

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

  useEffect(()=>{
    const fetchMovieYear=async ()=>{
      const {data}=await getMovieYear()
      setMovieYear(data)
    }
    fetchMovieYear()
  },[])

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
        <div className=' w-[80%] h-[70%] flex flex-col'>
          <div className='h-[30%] w-full flex flex-col justify-between '>

          <h1 className='text-xl h-[30%] font-semibold'>Year by stats</h1>
          <div className='flex h-[60%] w-full'>
            {
              movieYear.map((data, index)=>(
                <button key={index} onClick={()=>setYear(data.year)} className={`border-2 h-[90%] w-[20%] mr-4 ${data.year===year ? 'bg-white border-yellow-400 transition duration-300 rounded-lg' : 'border-yellow-600 bg-yellow-400'}`}>
                  {data.year}
                </button>
              ))
            }

          </div>
          </div>
          <div className='h-[80%] w-[50%]'>
            
            <BarGraph year={year}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
