import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { user, token } = response.data;

      if (user.role !== 'ngo') {
        setError('Access denied: Not an NGO account.');
        return;
      }

      login(user, token); // Use the login function from AuthContext
      navigate('/available-meals');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">NGO Login</h1>
      <form onSubmit={handleLogin} className="auth-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="button primary full-width">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;