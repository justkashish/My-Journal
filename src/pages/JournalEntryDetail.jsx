import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import '../styles/JournalEntryDetail.css';

const JournalEntryDetail = () => {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await api.get(`/api/journal/${id}`);
        setEntry(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch journal entry');
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get emotion icon
  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'angry':
        return '😠';
      case 'anxious':
        return '😰';
      case 'excited':
        return '😃';
      case 'grateful':
        return '🙏';
      default:
        return '😐';
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      setDeleteLoading(true);
      
      try {
        await api.delete(`/api/journal/${id}`);
        navigate('/dashboard');
      } catch (err) {
        setError('Failed to delete journal entry');
        setDeleteLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="loading-container">Loading entry...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!entry) {
    return <div className="not-found">Entry not found</div>;
  }

  return (
    <div className="entry-detail-container">
      <div className="entry-detail-header">
        <Link to="/dashboard" className="back-btn">
          <i className="fas fa-arrow-left"></i> Back to Journal
        </Link>
        <div className="entry-actions">
          <Link to={`/edit-entry/${id}`} className="edit-btn">
            <i className="fas fa-edit"></i> Edit
          </Link>
          <button 
            className="delete-btn" 
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            <i className="fas fa-trash"></i> {deleteLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="entry-detail-card">
        <div className="entry-detail-date">
          {formatDate(entry.date)}
        </div>
        
        <div className="entry-detail-emotion">
          <span className="emotion-icon">{getEmotionIcon(entry.detectedEmotion)}</span>
          <span className="emotion-label">
            {entry.detectedEmotion.charAt(0).toUpperCase() + entry.detectedEmotion.slice(1)}
            {entry.emotionTag && entry.emotionTag !== entry.detectedEmotion && 
              ` (You felt: ${entry.emotionTag})`}
          </span>
        </div>
        
        <div className="entry-detail-content">
          {entry.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalEntryDetail;