import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import History from './Components/History';
import OAuthCallbackHandler from "./components/OAuthCallbackHandler"

import ProtectedRoute from './Components/ProtectedRoute';


// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  };

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login />
          } 
        />
        
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Signup />
          } 
        />

        {/* OAuth Callback Route */}
        <Route path="/auth/callback" element={<OAuthCallbackHandler />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* Root Route - Redirect based on auth */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          } 
        />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/Home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;