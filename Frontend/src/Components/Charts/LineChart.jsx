import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const LineChart = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#2563eb"
          strokeWidth={3}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;