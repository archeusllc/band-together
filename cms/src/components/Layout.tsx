import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EnvironmentBadge } from './EnvironmentBadge';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-header">
            <div>
              <h1 className="navbar-brand">
                Band Together Admin
                <EnvironmentBadge />
              </h1>
            </div>
          </div>
          <ul className="navbar-menu">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/tracks">Tracks</Link>
            </li>
            <li>
              <Link to="/tags">Tags</Link>
            </li>
            <li>
              <Link to="/import">Import</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};
