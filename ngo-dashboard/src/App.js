import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import AvailableMeals from './pages/AvailableMeals';
import PickupSchedule from './pages/PickupSchedule';
import DonationRecords from './pages/DonationRecords';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';

const App = () => {
  return (
    <Main />
  );
};

const Main = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isHomePage = location.pathname === '/';

  if (isHomePage && !user) {
    return <HomePage />;
  }

  if (isLoginPage && !user) {
    return <LoginPage />;
  }

  if (isRegisterPage && !user) {
    return <RegisterPage />;
  }

  if (!user && !isLoginPage && !isHomePage && !isRegisterPage) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/available-meals" element={<AvailableMeals />} />
        <Route path="/pickup-schedule" element={<PickupSchedule />} />
        <Route path="/donation-records" element={<DonationRecords />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/available-meals" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
