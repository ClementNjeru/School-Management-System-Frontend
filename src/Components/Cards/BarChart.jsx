import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Bar } from 'recharts';
import { Box, IconButton, Pagination, Toolbar, Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';




const data = [
  { name: 'Paid', value: 40 },
  { name: 'Unpaid', value: 7 },
  { name: 'Partial', value: 33 },
];

const COLORS = ['#FFFF00', '#00FF00', '#FF0000'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="grey" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function Chart() {

  const [selectedGrade, setSelectedGrade] = useState();
  const { data: classList } = useQuery(['classes-data'], {
    cacheTime: 10 * 60 * 1000, // cache for 10 minutes
  });
  const handleChange = (e) => {
    setSelectedGrade(e.target.value || null);
  };


  return (
    // dropdown box for selecting the class
    <div className="bg-white mt-3 lg:h-96 h-auto p-2 w-150 rounded-lg shadow">
      <p className="text-gray-700 font-semibold">Payment Status Per Class</p>

      <Box>
        <div className="flex justify-between">
          <div className="flex">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 py-2 appearance-none dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              title="Select Class"
              name='grade'
              id='grade'
              value={selectedGrade ?? ''}
              onChange={handleChange}
            >

              <option value="">Select Class</option>
              {classList?.map((grade) => (
                <option key={grade?.id} value={grade?.id}>
                  {grade?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Box>
      <PieChart width={450} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
    
  );
}
export default Chart;



