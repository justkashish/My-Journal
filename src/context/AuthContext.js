import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        api.defaults.headers.common['x-auth-token'] = token;
        
        try {
          const res = await api.get('/api/auth/profile');
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          setError('Authentication failed. Please log in again.');
        }
      }
      
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (formData) => {
    try {
      const res = await api.post('/api/auth/register', formData);
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setError(null);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      return false;
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await api.post('/api/auth/login', formData);
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setError(null);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete api.defaults.headers.common['x-auth-token'];
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};