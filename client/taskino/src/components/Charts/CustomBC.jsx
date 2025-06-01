import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const getBarColor = (priority) => {
    switch (priority) {
      case "Low":
        return "#34D399"; 
      case "Medium":
        return "#F97316"; 
      case "High":
        return "#EF4444"; 
      default:
        return "#A3A3A3"; 
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const { priority, count } = payload[0].payload;

      return (
        <div className="bg-white shadow-lg border border-orange-300 rounded-md px-4 py-2">
          <p className="text-sm font-semibold text-orange-600">
            {priority} Priority
          </p>
          <p className="text-xs text-gray-600">Count: {count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-orange-100 rounded-xl shadow-sm p-4 mt-6">
      <h3 className="text-base font-semibold text-gray-700 mb-4">Task Priorities</h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" barGap={12}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

          <XAxis type="number" tick={{ fontSize: 12, fill: "#666" }} />
          <YAxis
            dataKey="priority"
            type="category"
            tick={{ fontSize: 13, fill: "#444" }}
            width={80}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />

          <Bar dataKey="count" radius={[5, 5, 5, 5]}>
            {data.map((entry, index) => (
              <Cell
                key={`bar-${index}`}
                fill={getBarColor(entry.priority)}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
