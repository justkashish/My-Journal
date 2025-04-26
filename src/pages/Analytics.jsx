import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import EmotionPieChart from '../components/EmotionPieChart';
import EmotionBarChart from '../components/EmotionBarChart';
import '../styles/Analytics.css';

const Analytics = () => {
  const [emotionCounts, setEmotionCounts] = useState([]);
  const [weeklyEmotions, setWeeklyEmotions] = useState([]);
  const [monthlyEmotions, setMonthlyEmotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch emotion counts
        const countsRes = await api.get('/api/analytics/emotions');
        setEmotionCounts(countsRes.data);

        // Fetch weekly emotions
        const weeklyRes = await api.get('/api/analytics/weekly');
        setWeeklyEmotions(weeklyRes.data);

        // Fetch monthly emotions
        const monthlyRes = await api.get('/api/analytics/monthly');
        setMonthlyEmotions(monthlyRes.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Get total entries
  const getTotalEntries = () => {
    return emotionCounts.reduce((total, item) => total + item.count, 0);
  };

  // Get dominant emotion
  const getDominantEmotion = () => {
    if (emotionCounts.length === 0) return 'No data';
    
    let dominant = emotionCounts[0];
    
    for (let i = 1; i < emotionCounts.length; i++) {
      if (emotionCounts[i].count > dominant.count) {
        dominant = emotionCounts[i];
      }
    }
    
    return dominant._id;
  };

  if (loading) {
    return <div className="loading-container">Loading analytics...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="analytics-container">
      <h1>Your Emotional Insights</h1>
      
      {getTotalEntries() === 0 ? (
        <div className="no-data">
          <p>You need to create some journal entries to see analytics.</p>
        </div>
      ) : (
        <>
          <div className="analytics-summary">
            <div className="summary-card">
              <h3>Total Entries</h3>
              <p className="summary-value">{getTotalEntries()}</p>
            </div>
            <div className="summary-card">
              <h3>Dominant Emotion</h3>
              <p className="summary-value">{getDominantEmotion()}</p>
            </div>
          </div>
          
          <div className="analytics-charts">
            <div className="chart-card">
              <EmotionPieChart data={emotionCounts} />
            </div>
            
            <div className="chart-card">
              <EmotionBarChart 
                data={weeklyEmotions} 
                title="Weekly Emotion Trends" 
              />
            </div>
            
            <div className="chart-card">
              <EmotionBarChart 
                data={monthlyEmotions} 
                title="Monthly Emotion Trends" 
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;