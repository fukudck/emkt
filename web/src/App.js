import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login'; // Trang đăng nhập
import Register from './components/Auth/Register'; // Trang đăng ký
import ProtectedRoute from './components/Auth/ProtectedRoute';
import HomePage from './components/Dashboard/HomePage'; 
import UserManagement from './components/Dashboard/UserManagement';
import CampaignManagement from './components/Dashboard/CampaignManagement';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import EmailTemplate from './components/Dashboard/EmailTemplate';
import Contact from './components/Dashboard/Contact';
import Group from './components/Dashboard/Group';
import EmailMarketing from './components/Dashboard/EmailMarketing';

function App() {
  const token = localStorage.getItem('token'); // Kiểm tra nếu người dùng đã đăng nhập

  return (
    <Router>
      <Routes>
        {/* Route cho trang chủ và login */}
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Login />} // Chuyển hướng nếu đã đăng nhập
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />} // Chuyển hướng nếu đã đăng nhập
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />} // Chuyển hướng nếu đã đăng nhập
        />

        {/* Các route cho các trang yêu cầu đăng nhập */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                  <Header />
                  <HomePage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <ProtectedRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                  <Header />
                  <UserManagement />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaign-management"
          element={
            <ProtectedRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                  <Header />
                  <CampaignManagement />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/email-template"
          element={
            <ProtectedRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                  <Header />
                  <EmailTemplate />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                  <Header />
                  <Contact />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/group"
          element={
            <ProtectedRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                  <Header />
                  <Group />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/email-marketing"
          element={
            <ProtectedRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                  <Header />
                  <EmailMarketing />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;