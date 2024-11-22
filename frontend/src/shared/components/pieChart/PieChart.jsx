import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Sample data
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

export default class PieChartComponent extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width={60} height={60}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={25}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}