import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const AreaGraph = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      {data.length > 0 ? (
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="movies" stroke="rgb(243, 215, 5)" fill="rgb(243, 215, 5)" />
        </AreaChart>
      ) : (
        <div>Loading data...</div>
      )}
    </ResponsiveContainer>
  )
}

export default AreaGraph