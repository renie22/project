import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    straw: 4000,
    cup: 2400,
    tea: 2400,
  },
  {
    name: "Mon",
    straw: 3000,
    cup: 1398,
    tea: 2210,
  },
  {
    name: "Tue",
    straw: 2000,
    cup: 9800,
    tea: 2290,
  },
  {
    name: "Wed",
    straw: 2780,
    cup: 3908,
    tea: 2000,
  },
  {
    name: "Thu",
    straw: 1890,
    cup: 4800,
    tea: 2181,
  },
  {
    name: "Fri",
    straw: 2390,
    cup: 3800,
    tea: 2500,
  },
  {
    name: "Sat",
    straw: 3490,
    cup: 4300,
    tea: 2100,
  },
];

const BigChartBox = () => {
  return (
    <div className="h-full w-full flex flex-col justify-between">
      <h1 className="text-2xl font-bold mb-5">Revenue Analytics</h1>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="tea"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="cup"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="straw"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
