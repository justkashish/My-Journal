import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/JournalEntryItem.css';

const JournalEntryItem = ({ entry }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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

  // Truncate content
  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="journal-entry-item">
      <div className="entry-header">
        <div className="entry-date">{formatDate(entry.date)}</div>
        <div className="entry-emotion">
          {getEmotionIcon(entry.detectedEmotion)} {entry.detectedEmotion}
        </div>
      </div>
      <div className="entry-content">
        {truncateContent(entry.content)}
      </div>
      <div className="entry-actions">
        <Link to={`/entry/${entry._id}`} className="view-btn">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default JournalEntryItem;