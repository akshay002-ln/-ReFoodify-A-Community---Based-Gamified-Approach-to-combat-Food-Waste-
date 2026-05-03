import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { logout } = useAuth();
  return (
    <div className="header">
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
};

export default Header;