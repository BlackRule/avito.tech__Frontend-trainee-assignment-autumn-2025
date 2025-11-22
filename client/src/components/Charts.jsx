import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#FFBB28']; // Green (Approved), Red (Rejected), Yellow (Changes)
// Actually let's match our theme
// Success: 150 60% 40% -> #29a366
// Danger: 0 70% 60% -> #e05252
// Warning: 35 90% 60% -> #f0a93e

const THEME_COLORS = {
    approved: '#29a366',
    rejected: '#e05252',
    requestChanges: '#f0a93e'
};

export const ActivityChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--color-border))" />
                <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
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
                <Bar dataKey="approved" name="Approved" fill={THEME_COLORS.approved} radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="rejected" name="Rejected" fill={THEME_COLORS.rejected} radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="requestChanges" name="Changes Requested" fill={THEME_COLORS.requestChanges} radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export const DecisionsChart = ({ data }) => {
    // Data comes as object { approved: 10, rejected: 5, requestChanges: 2 }
    // Need to transform for PieChart
    const chartData = [
        { name: 'Approved', value: data.approved },
        { name: 'Rejected', value: data.rejected },
        { name: 'Changes Requested', value: data.requestChanges }
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
