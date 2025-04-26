import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import '../styles/JournalEntryForm.css';

const JournalEntryForm = () => {
  const [formData, setFormData] = useState({
    content: '',
    emotionTag: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // If id exists, fetch entry data
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      setFetchLoading(true);
      
      const fetchEntry = async () => {
        try {
          const res = await api.get(`/api/journal/${id}`);
          setFormData({
            content: res.data.content,
            emotionTag: res.data.emotionTag || ''
          });
          setFetchLoading(false);
        } catch (err) {
          setError('Failed to fetch journal entry');
          setFetchLoading(false);
        }
      };

      fetchEntry();
    }
  }, [id]);

  const { content, emotionTag } = formData;

  const handleChange = e => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await api.put(`/api/journal/${id}`, formData);
      } else {
        await api.post('/api/journal', formData);
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save journal entry');
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="loading-container">Loading entry...</div>;
  }

  return (
    <div className="journal-form-container">
      <h1>{isEdit ? 'Edit Journal Entry' : 'New Journal Entry'}</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="journal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">What's on your mind today?</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleChange}
            rows="10"
            placeholder="Write your thoughts here..."
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="emotionTag">How are you feeling? (Optional)</label>
          <select
            id="emotionTag"
            name="emotionTag"
            value={emotionTag}
            onChange={handleChange}
          >
            <option value="">Let AI detect my emotion</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="neutral">Neutral</option>
            <option value="anxious">Anxious</option>
            <option value="excited">Excited</option>
            <option value="grateful">Grateful</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="save-btn"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalEntryForm;