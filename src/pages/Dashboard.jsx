import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import JournalEntryItem from '../components/JournalEntryItem';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await api.get('/api/journal');
        setEntries(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch journal entries');
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading your journal entries...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your Journal</h1>
        <Link to="/new-entry" className="new-entry-btn">
          <i className="fas fa-plus"></i> New Entry
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {entries.length === 0 ? (
        <div className="no-entries">
          <p>You haven't created any journal entries yet.</p>
          <Link to="/new-entry" className="start-btn">
            Start Journaling
          </Link>
        </div>
      ) : (
        <div className="entries-container">
          {entries.map(entry => (
            <JournalEntryItem key={entry._id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;