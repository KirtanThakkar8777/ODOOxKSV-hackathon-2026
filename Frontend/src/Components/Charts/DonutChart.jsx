import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

const DonutChart = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <RePieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={
                COLORS[index % COLORS.length]
              }
            />
          ))}
        </Pie>

        <Tooltip />
      </RePieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;