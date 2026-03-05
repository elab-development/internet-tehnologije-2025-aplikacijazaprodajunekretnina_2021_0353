import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PropertiesList from './pages/PropertiesList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Simple Navigation Menu */}
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">CRM Nekretnine</div>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Login</Link>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/properties" className="hover:underline">Nekretnine</Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties" element={<PropertiesList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
