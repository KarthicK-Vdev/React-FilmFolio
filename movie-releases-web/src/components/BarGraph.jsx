import React, { useEffect, useState } from 'react'
import { getMovieYearAnalyticsData } from '../services/apiCalls'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarGraph = ({year}) => {
    const[yearAnalyticData, setYearAnalyticData]=useState()
    useEffect(()=>{
        const fetchYearAnalyticData=async()=>{
            try {
                const {data}=await getMovieYearAnalyticsData(year)
                setYearAnalyticData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchYearAnalyticData()
    },[year])
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={yearAnalyticData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
         dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="movieCount" fill="rgb(243, 215, 5)" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarGraph