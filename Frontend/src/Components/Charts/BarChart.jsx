import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

const BarChart = ({ data, bars, height = 300, colors = ['#3b82f6', '#10b981', '#f59e0b'] }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="name" 
          stroke="#64748b" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#64748b" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.key}
            fill={bar.color || colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
            name={bar.name}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;