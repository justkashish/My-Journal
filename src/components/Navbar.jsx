import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-book-open"></i>
          <span>JournalMood</span>
        </Link>

        {isAuthenticated ? (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Journal
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/new-entry" className="nav-link">
                New Entry
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/analytics" className="nav-link">
                Analytics
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;