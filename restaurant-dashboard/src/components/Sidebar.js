import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Canteen Hub</h2>
      <ul>
        <li><Link to="/menu-management">Menu Management</Link></li>
        <li><Link to="/qr-code-generator">QR Code Generator</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/feedback-ratings">Feedback & Ratings</Link></li>
        <li><Link to="/ngo-coordination">NGO Coordination</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;