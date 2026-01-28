import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barData = [
  { name: "A", value: 38 },
  { name: "B", value: 64 },
  { name: "C", value: 92 },
  { name: "D", value: 71 },
  { name: "E", value: 55 },
];

const lineData = [
  { name: "Mon", value: 42 },
  { name: "Tue", value: 58 },
  { name: "Wed", value: 50 },
  { name: "Thu", value: 76 },
  { name: "Fri", value: 61 },
  { name: "Sat", value: 83 },
  { name: "Sun", value: 69 },
];

const tooltipStyle = {
  background: "var(--kanagawa-sumi-2)",
  border: "1px solid var(--kanagawa-wave-blue)",
  borderRadius: "8px",
  color: "var(--kanagawa-fuji-white)",
  fontSize: "12px",
};

export function MdxBarChart() {
  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={barData} margin={{ top: 10, right: 18, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="var(--kanagawa-wave-blue)" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "var(--kanagawa-fuji-white)", fontSize: 12 }} axisLine={false} />
          <YAxis tick={{ fill: "var(--kanagawa-fuji-white)", fontSize: 12 }} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(126, 156, 216, 0.08)" }} />
          <Bar dataKey="value" radius={[8, 8, 4, 4]} fill="var(--kanagawa-spring-blue)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MdxLineChart() {
  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={lineData} margin={{ top: 10, right: 18, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="var(--kanagawa-wave-blue)" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "var(--kanagawa-fuji-white)", fontSize: 12 }} axisLine={false} />
          <YAxis tick={{ fill: "var(--kanagawa-fuji-white)", fontSize: 12 }} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--kanagawa-crystal-blue)" }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--kanagawa-crystal-blue)"
            strokeWidth={3}
            dot={{ fill: "var(--kanagawa-carp-yellow)", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
