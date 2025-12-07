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
import { getCountyOffenseTypesChartData } from '../data/chartData';
import { YEAR } from '../data/counties';

interface CountyOffenseTypesChartProps {
  countySlug: string | undefined;
}

export default function CountyOffenseTypesChart({ countySlug }: CountyOffenseTypesChartProps) {
  const chartData = useMemo(() => {
    return getCountyOffenseTypesChartData(countySlug);
  }, [countySlug]);

  // Create combined data array with separate keys for actual and projected values
  // This allows us to show solid lines for actual data and dashed lines for projections
  const combinedData = useMemo(() => {
    return chartData.map((point) => ({
      ...point,
      violentActual: point.year <= YEAR ? point.violent : null,
      violentProjected: point.year > YEAR ? point.violent : (point.year === YEAR ? point.violent : null),
      propertyActual: point.year <= YEAR ? point.property : null,
      propertyProjected: point.year > YEAR ? point.property : (point.year === YEAR ? point.property : null),
      drugActual: point.year <= YEAR ? point.drug : null,
      drugProjected: point.year > YEAR ? point.drug : (point.year === YEAR ? point.drug : null),
      sexActual: point.year <= YEAR ? point.sex : null,
      sexProjected: point.year > YEAR ? point.sex : (point.year === YEAR ? point.sex : null),
      otherActual: point.year <= YEAR ? point.other : null,
      otherProjected: point.year > YEAR ? point.other : (point.year === YEAR ? point.other : null),
    }));
  }, [chartData]);

  if (!countySlug || chartData.length === 0) {
    return null;
  }

  // Distinct colors that complement the brown theme
  const violentColor = '#991b1b'; // red-800 (deep burgundy)
  const propertyColor = '#155e75'; // cyan-800 (teal)
  const drugColor = '#166534'; // green-800 (forest green)
  const sexColor = '#7c2d12'; // orange-900 (rust)
  const otherColor = '#581c87'; // purple-800 (deep purple)

  return (
    <div className="mb-8 bg-white rounded-lg p-6 md:p-8 border border-brown-200">
      <h2 className="text-2xl font-bold text-brown-900 mb-6">
        Offense Types Over Time
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
          {/* Violent Offenses Actual */}
          <Line
            type="monotone"
            dataKey="violentActual"
            name="Violent Offenses per 1K Population (Actual)"
            stroke={violentColor}
            strokeWidth={2}
            dot={{ fill: violentColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Violent Offenses Projected */}
          <Line
            type="monotone"
            dataKey="violentProjected"
            name="Violent Offenses per 1K Population (Projected)"
            stroke={violentColor}
            strokeWidth={2}
            strokeDasharray="10 5"
            dot={{ fill: violentColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Property Offenses Actual */}
          <Line
            type="monotone"
            dataKey="propertyActual"
            name="Property Offenses per 1K Population (Actual)"
            stroke={propertyColor}
            strokeWidth={2}
            dot={{ fill: propertyColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Property Offenses Projected */}
          <Line
            type="monotone"
            dataKey="propertyProjected"
            name="Property Offenses per 1K Population (Projected)"
            stroke={propertyColor}
            strokeWidth={2}
            strokeDasharray="10 5"
            dot={{ fill: propertyColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Drug Offenses Actual */}
          <Line
            type="monotone"
            dataKey="drugActual"
            name="Drug Offenses per 1K Population (Actual)"
            stroke={drugColor}
            strokeWidth={2}
            dot={{ fill: drugColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Drug Offenses Projected */}
          <Line
            type="monotone"
            dataKey="drugProjected"
            name="Drug Offenses per 1K Population (Projected)"
            stroke={drugColor}
            strokeWidth={2}
            strokeDasharray="10 5"
            dot={{ fill: drugColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Sex Offenses Actual */}
          <Line
            type="monotone"
            dataKey="sexActual"
            name="Sex Offenses per 1K Population (Actual)"
            stroke={sexColor}
            strokeWidth={2}
            dot={{ fill: sexColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Sex Offenses Projected */}
          <Line
            type="monotone"
            dataKey="sexProjected"
            name="Sex Offenses per 1K Population (Projected)"
            stroke={sexColor}
            strokeWidth={2}
            strokeDasharray="10 5"
            dot={{ fill: sexColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Other Offenses Actual */}
          <Line
            type="monotone"
            dataKey="otherActual"
            name="Other Offenses per 1K Population (Actual)"
            stroke={otherColor}
            strokeWidth={2}
            dot={{ fill: otherColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          {/* Other Offenses Projected */}
          <Line
            type="monotone"
            dataKey="otherProjected"
            name="Other Offenses per 1K Population (Projected)"
            stroke={otherColor}
            strokeWidth={2}
            strokeDasharray="10 5"
            dot={{ fill: otherColor, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

