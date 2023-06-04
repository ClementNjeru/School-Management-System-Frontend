import React from "react";
import { PieChart, Cell, Pie, Tooltip } from "recharts";

const KES = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KES",
});
const data = [
  { name: "MPESA", value: 40000 },
  { name: "BANK", value: 7000 },
  { name: "CHEQUE", value: 3700 },
];

const DataPie = () => {
  const COLORS = [
    "#9F7AEA",
    "#4C51BF",
    "#38B2AC",
    "#ED8936",
    "#FC8181",
    "#4299E1",
  ];
  return (
    <div className="bg-white mt-3 lg:h-96 md:h-auto p-2 w-full rounded-lg shadow">
      <p className="text-gray-700 font-semibold">Payment Modes Stats</p>
      <PieChart width={600} height={400} className="mx-auto my-auto ">
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data || []}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          label={({ name, value }) => {
            if (value === 0) {
              return null;
            }
            return `${name} : ${KES.format(value)}`;
          }}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => KES.format(value)} />
      </PieChart>
    </div>
  );
};

export default DataPie;
