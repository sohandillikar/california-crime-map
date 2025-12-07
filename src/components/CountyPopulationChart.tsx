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
import { getCountyPopulationChartData } from '../data/chartData';

interface CountyPopulationChartProps {
  countySlug: string | undefined;
}

// Helper function to format numbers with abbreviations (K for thousands, M for millions)
function formatAbbreviated(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

// Helper function to format numbers with commas for tooltip
function formatWithCommas(value: number): string {
  return value.toLocaleString();
}

export default function CountyPopulationChart({ countySlug }: CountyPopulationChartProps) {
  const chartData = useMemo(() => {
    return getCountyPopulationChartData(countySlug);
  }, [countySlug]);

  // Calculate y-axis domain with padding
  const yAxisDomain = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return undefined;
    }

    // Calculate min and max population values
    const populations = chartData.map((point) => point.population).filter((pop) => pop > 0);
    
    if (populations.length === 0) {
      return undefined;
    }

    const minPopulation = Math.min(...populations);
    const maxPopulation = Math.max(...populations);

    // Handle edge case: if min and max are the same (single value or all same)
    if (minPopulation === maxPopulation) {
      const padding = minPopulation * 0.1; // 10% of the value
      return [Math.max(0, minPopulation - padding), maxPopulation + padding];
    }

    // Calculate range and apply 10% padding
    const range = maxPopulation - minPopulation;
    const padding = range * 0.1;
    const minWithPadding = Math.max(0, minPopulation - padding);
    const maxWithPadding = maxPopulation + padding;

    return [minWithPadding, maxWithPadding];
  }, [chartData]);

  if (!countySlug || chartData.length === 0) {
    return null;
  }

  // Brown theme color
  const populationColor = '#6d4c41'; // brown-600

  return (
    <div className="mb-8 bg-white rounded-lg p-6 md:p-8 border border-brown-200">
      <h2 className="text-2xl font-bold text-brown-900 mb-6">
        Population Over Time
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
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
            tickFormatter={formatAbbreviated}
            domain={yAxisDomain}
            label={{
              value: 'Population',
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
            formatter={(value: number) => formatWithCommas(value)}
          />
          <Line
            type="monotone"
            dataKey="population"
            name="Population"
            stroke={populationColor}
            strokeWidth={2}
            dot={{ fill: populationColor, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

