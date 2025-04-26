import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/EmotionBarChart.css';

const COLORS = {
  happy: '#4CAF50',
  sad: '#2196F3',
  angry: '#F44336',
  neutral: '#9E9E9E',
  anxious: '#FF9800',
  excited: '#E91E63',
  grateful: '#8BC34A'
};

const EmotionBarChart = ({ data, title }) => {
  // Process data for chart
  const processedData = {};
  
  // Group by date
  data.forEach(item => {
    if (!processedData[item.date]) {
      processedData[item.date] = {
        date: item.date,
        happy: 0,
        sad: 0,
        angry: 0,
        neutral: 0,
        anxious: 0,
        excited: 0,
        grateful: 0
      };
    }
    
    processedData[item.date][item.emotion] = item.count;
  });
  
  // Convert to array
  const chartData = Object.values(processedData);

  return (
    <div className="emotion-bar-chart">
      <h3>{title || 'Weekly Emotion Trends'}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="happy" fill={COLORS.happy} stackId="a" />
          <Bar dataKey="sad" fill={COLORS.sad} stackId="a" />
          <Bar dataKey="angry" fill={COLORS.angry} stackId="a" />
          <Bar dataKey="neutral" fill={COLORS.neutral} stackId="a" />
          <Bar dataKey="anxious" fill={COLORS.anxious} stackId="a" />
          <Bar dataKey="excited" fill={COLORS.excited} stackId="a" />
          <Bar dataKey="grateful" fill={COLORS.grateful} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionBarChart;