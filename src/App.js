// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutPage from './components/AboutPage';
import AdoptPage from './components/AdoptPage';
import AdoptForm from './components/AdoptForm';
import LoginPage from './components/LoginPage';
import StaffLoginPage from './components/StaffLoginPage';
import StaffDashboard from './components/StaffDashboard';
import SurrenderForm from './components/SurrenderForm';
import Footer from './components/Footer';
import GalleryPage from './components/GalleryPage';
import UserDashboard from './components/UserDashboard';
import DonatePage from './components/DonatePage';
import ScrollTop from './components/ScrollTop';
import './styles/PetImages.css';
import './styles/App.css';

// Private Route Component for Staff
const StaffPrivateRoute = ({ children }) => {
  const { isStaffLoggedIn } = useAuth();
  return isStaffLoggedIn ? children : <Navigate to="/staff-login" replace />;
};

// Private Route Component for User
const UserPrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Check for regular user login
  return user ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  const { isStaffLoggedIn } = useAuth(); // Check staff login status

  return (
    <div className="app">
      <Navbar isStaffLoggedIn={isStaffLoggedIn} />
      <div className="main-content">
        <main>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/adopt" element={<AdoptPage />} />
            <Route path="/adopt/form" element={<AdoptForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage />} />
            <Route path="/surrender" element={<SurrenderForm />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/staff-login" element={<StaffLoginPage />} />
            <Route path="/staff-dashboard" element={
              <StaffPrivateRoute>
                <StaffDashboard />
              </StaffPrivateRoute>
            } />
            <Route path="/my-dashboard" element={
              <UserPrivateRoute>
                <UserDashboard />
              </UserPrivateRoute>
            } />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;