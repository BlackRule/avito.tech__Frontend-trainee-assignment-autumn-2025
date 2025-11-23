import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { ActivityPoint, DecisionsBreakdown } from '../types';

const THEME_COLORS = {
  approved: '#29a366',
  rejected: '#e05252',
  requestChanges: '#f0a93e'
};

interface ActivityChartProps {
  data: ActivityPoint[];
}

export const ActivityChart = ({ data }: ActivityChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--color-border))" />
        <XAxis
          dataKey="date"
          tickFormatter={(date: string) => new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
          stroke="hsl(var(--color-text-secondary))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--color-text-secondary))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{ backgroundColor: 'hsl(var(--color-surface))', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}
          labelStyle={{ color: 'hsl(var(--color-text))', fontWeight: '600', marginBottom: '0.5rem' }}
        />
        <Legend />
        <Bar dataKey="approved" name="Одобрено" fill={THEME_COLORS.approved} radius={[4, 4, 0, 0]} stackId="a" />
        <Bar dataKey="rejected" name="Отклонено" fill={THEME_COLORS.rejected} radius={[4, 4, 0, 0]} stackId="a" />
        <Bar dataKey="requestChanges" name="Запрошены изменения" fill={THEME_COLORS.requestChanges} radius={[4, 4, 0, 0]} stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface DecisionsChartProps {
  data: DecisionsBreakdown | null;
}

export const DecisionsChart = ({ data }: DecisionsChartProps) => {
  const chartData = [
    { name: 'Одобрено', value: data?.approved ?? 0 },
    { name: 'Отклонено', value: data?.rejected ?? 0 },
    { name: 'Запрошены изменения', value: data?.requestChanges ?? 0 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          <Cell key="cell-0" fill={THEME_COLORS.approved} />
          <Cell key="cell-1" fill={THEME_COLORS.rejected} />
          <Cell key="cell-2" fill={THEME_COLORS.requestChanges} />
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: 'hsl(var(--color-surface))', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}
          itemStyle={{ color: 'hsl(var(--color-text))' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
