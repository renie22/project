import React from "react";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";

const BarChartBox = (props) => {
  return (
    <div className="w-full h-full">
      <h1 className="text-xl mb-5 font-bold">{props.title}</h1>
      <div>
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
