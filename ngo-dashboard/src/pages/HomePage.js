import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to the Canteen Hub - NGO Portal</h1>
      <p>Connecting surplus meals with those in need.</p>
      <div className="homepage-buttons">
        <Link to="/login" className="button primary">
          Login
        </Link>
        <Link to="/register" className="button success">
          Register
        </Link>
        <Link to="/available-meals" className="button secondary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;