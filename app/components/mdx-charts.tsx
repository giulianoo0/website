import {
  useEffect,
  useRef,
  useState,
} from "react";
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

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// SSR placeholder for the chart
function ChartPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: 240,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "60%",
            height: 4,
            background: "var(--kanagawa-wave-blue)",
            borderRadius: 2,
            margin: "0 auto 12px",
          }}
        />
        <div
          style={{
            fontSize: 12,
            color: "var(--kanagawa-fuji-white)",
            opacity: 0.5,
          }}
        >
          Loading chart...
        </div>
      </div>
    </div>
  );
}

function AnimatedBarChart() {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="chart-card">
      <ResponsiveContainer width="100%" height={240}>
        {isInView ? (
          <BarChart
            data={barData}
            margin={{ top: 10, right: 18, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              stroke="var(--kanagawa-wave-blue)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--kanagawa-fuji-white)", fontSize: 12 }}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "var(--kanagawa-fuji-white)", fontSize: 12 }}
              axisLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgba(126, 156, 216, 0.08)" }}
            />
            <Bar
              dataKey="value"
              radius={[8, 8, 4, 4]}
              fill="var(--kanagawa-spring-blue)"
              animationDuration={1500}
              animationBegin={0}
            />
          </BarChart>
        ) : (
          <ChartPlaceholder />
        )}
      </ResponsiveContainer>
    </div>
  );
}

function AnimatedLineChart() {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="chart-card">
      <ResponsiveContainer width="100%" height={240}>
        {isInView ? (
          <LineChart
            data={lineData}
            margin={{ top: 10, right: 18, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              stroke="var(--kanagawa-wave-blue)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--kanagawa-fuji-white)", fontSize: 12 }}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "var(--kanagawa-fuji-white)", fontSize: 12 }}
              axisLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ stroke: "var(--kanagawa-crystal-blue)" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--kanagawa-crystal-blue)"
              strokeWidth={3}
              dot={{ fill: "var(--kanagawa-carp-yellow)", r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={2000}
              animationBegin={0}
            />
          </LineChart>
        ) : (
          <ChartPlaceholder />
        )}
      </ResponsiveContainer>
    </div>
  );
}

export function MdxBarChart() {
  return <AnimatedBarChart />;
}

export function MdxLineChart() {
  return <AnimatedLineChart />;
}
