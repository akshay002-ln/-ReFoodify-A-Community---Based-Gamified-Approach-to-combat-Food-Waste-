import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>NGO Portal</h2>
      <ul>
        <li><Link to="/available-meals">Available Meals</Link></li>
        <li><Link to="/pickup-schedule">Pickup Schedule</Link></li>
        <li><Link to="/donation-records">Donation Records</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;