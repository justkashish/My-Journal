import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import '../styles/EmotionPieChart.css';

const COLORS = {
  happy: '#4CAF50',
  sad: '#2196F3',
  angry: '#F44336',
  neutral: '#9E9E9E',
  anxious: '#FF9800',
  excited: '#E91E63',
  grateful: '#8BC34A'
};

const EmotionPieChart = ({ data }) => {
  // Format data for chart
  const chartData = data.map(item => ({
    name: item._id,
    value: item.count,
    color: COLORS[item._id] || '#9E9E9E'
  }));

  return (
    <div className="emotion-pie-chart">
      <h3>Emotion Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionPieChart;