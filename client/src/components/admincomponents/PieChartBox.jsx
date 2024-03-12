import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Milk Tea", value: 400, color: "#0088FE" },
  { name: "Bubble Tea", value: 300, color: "#00C49F" },
  { name: "Apple Tea", value: 300, color: "#FFBB28" },
  { name: "Fruit Tea", value: 200, color: "#FF8042" },
];

const PieChartBox = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-2xl font-bold">Leads by Source</h1>
      <div className="flex items-center justify-center w-full h-full">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between gap-2 text-sm">
        {data.map((item) => (
          <div className="flex flex-col gap-2 items-center" key={item.name}>
            <div className="flex gap-2 items-center">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
