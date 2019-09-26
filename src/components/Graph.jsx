import React, { useContext } from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from 'recharts';

import { stateContext } from '../App';

import './Graph.scss';

export function Graph() {
  const { weatherData } = useContext(stateContext);
  const tempKeys = [
    { 
      key: 'temp',
      name: 'Current Temp'
    }, 
    { 
      key: 'temp_min',
      name: 'Min Temp'
    }, 
    { 
      key: 'temp_max',
      name: 'Max Temp'
    }];

  console.log('tempKeys:', tempKeys);
  const tempData = tempKeys.map(key => {
    return {
      name: key.name,
      temp: weatherData[key.key],
    }
  })

  return (
    <div className="graph">
      <ResponsiveContainer>
        <LineChart width={300} height={100} data={tempData}>
          <XAxis dataKey="name"/>
          <YAxis dataKey="temp"/>
          <Line unit={100} type="monotone" dataKey="temp" stroke="#000000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}