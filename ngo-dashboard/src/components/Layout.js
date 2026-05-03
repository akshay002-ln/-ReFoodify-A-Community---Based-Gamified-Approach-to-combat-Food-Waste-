import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Dashboard.css';

const Layout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;