import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getCountyChartData } from '../data/chartData';
import { YEAR } from '../data/counties';

interface CountyCrimeChartProps {
  countySlug: string | undefined;
}

export default function CountyCrimeChart({ countySlug }: CountyCrimeChartProps) {
  const chartData = useMemo(() => {
    return getCountyChartData(countySlug);
  }, [countySlug]);

  // Create combined data array with separate keys for actual and projected values
  // This allows us to show solid lines for actual data and dashed lines for projections
  const combinedData = useMemo(() => {
    return chartData.map((point) => ({
      ...point,
      feloniesActual: point.year <= YEAR ? point.felonies : null,
      feloniesProjected: point.year > YEAR ? point.felonies : (point.year === YEAR ? point.felonies : null),
      misdemeanorsActual: point.year <= YEAR ? point.misdemeanors : null,
      misdemeanorsProjected: point.year > YEAR ? point.misdemeanors : (point.year === YEAR ? point.misdemeanors : null),
    }));
  }, [chartData]);

  if (!countySlug || chartData.length === 0) {
    return null;
  }

  // Brown theme colors
  const feloniesColor = '#6d4c41'; // brown-600
  const misdemeanorsColor = '#a1887f'; // brown-300

  return (
    <div className="mb-8 bg-white rounded-lg p-6 md:p-8 border border-brown-200">
      <h2 className="text-2xl font-bold text-brown-900 mb-6">
        Crime Trends Over Time
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={combinedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#bcaaa4" />
          <XAxis
            dataKey="year"
            stroke="#5d4037"
            style={{ fontSize: '12px' }}
            tick={{ fill: '#5d4037' }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="#5d4037"
            style={{ fontSize: '12px' }}
            tick={{ fill: '#5d4037' }}
            label={{
              value: 'Per 1,000 Population',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#5d4037' },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#efebe9',
              border: '1px solid #bcaaa4',
              borderRadius: '4px',
            }}
            labelStyle={{ color: '#3e2723', fontWeight: 'bold' }}
            formatter={(value: number) => value.toFixed(2)}
          />
          {/* Felonies Actual */}
          <Line
            type="monotone"
            dataKey="feloniesActual"
            name="Total Felonies per 1K Population (Actual)"
            stroke={feloniesColor}
            strokeWidth={2}
            dot={{ fill: feloniesColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Felonies Projected */}
          <Line
            type="monotone"
            dataKey="feloniesProjected"
            name="Total Felonies per 1K Population (Projected)"
            stroke={feloniesColor}
            strokeWidth={2}
            strokeDasharray="8 5"
            dot={{ fill: feloniesColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Misdemeanors Actual */}
          <Line
            type="monotone"
            dataKey="misdemeanorsActual"
            name="Misdemeanors per 1K Population (Actual)"
            stroke={misdemeanorsColor}
            strokeWidth={2}
            dot={{ fill: misdemeanorsColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Misdemeanors Projected */}
          <Line
            type="monotone"
            dataKey="misdemeanorsProjected"
            name="Misdemeanors per 1K Population (Projected)"
            stroke={misdemeanorsColor}
            strokeWidth={2}
            strokeDasharray="8 5"
            dot={{ fill: misdemeanorsColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


