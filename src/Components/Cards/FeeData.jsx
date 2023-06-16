import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
        name: 'Page A',
        current: 4200,
        previous: 2000,
        amt: 2400,
    },
    {
        name: 'Page B',
        current: 3000,
        previous: 4400,
        amt: 2210,
    },
    {
        name: 'Page C',
        current: 4500,
        previous: 2400,
        amt: 2290,
    },
    {
        name: 'Page D',
        current: 5600,
        previous: 6800,
        amt: 2000,
    },
];

function FeeData() {
    return (
        <div className="bg-white mt-3 lg:h-96 h-auto p-2 w-150 rounded-lg shadow">
            <p className="text-gray-700 font-semibold">Payments(per year)</p>
            <BarChart
                width={550}
                height={450}
                data={data}
                margin={{
                    top: 20,
                    right: 65,
                    // left: 1,
                    bottom: 45,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="previous" stackId="a" fill="#8884d8" />
                <Bar dataKey="current" stackId="a" fill="#82ca9d" />
            </BarChart>
        </div>

    )
}

export default FeeData;