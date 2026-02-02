import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LayoutDashboard, Activity, LogOut, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <Leaf className="brand-icon" />
                    <span className="brand-text">SustainLite</span>
                </Link>

                {isAuthenticated && (
                    <div className="navbar-menu">
                        <Link
                            to="/dashboard"
                            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                        >
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            to="/activities"
                            className={`nav-link ${isActive('/activities') ? 'active' : ''}`}
                        >
                            <Activity size={20} />
                            <span>Activities</span>
                        </Link>
                    </div>
                )}

                <div className="navbar-actions">
                    {isAuthenticated ? (
                        <>
                            <div className="user-info">
                                <User size={18} />
                                <span>{user?.username}</span>
                            </div>
                            <button onClick={logout} className="btn btn-outline btn-sm">
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary btn-sm">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
