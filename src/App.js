import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JournalEntryForm from './pages/JournalEntryForm';
import JournalEntryDetail from './pages/JournalEntryDetail';
import Analytics from './pages/Analytics';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Styles
import './styles/App.css';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/new-entry" element={<PrivateRoute><JournalEntryForm /></PrivateRoute>} />
            <Route path="/edit-entry/:id" element={<PrivateRoute><JournalEntryForm /></PrivateRoute>} />
            <Route path="/entry/:id" element={<PrivateRoute><JournalEntryDetail /></PrivateRoute>} />
            <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;