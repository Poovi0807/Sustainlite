import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../services/api';
import {
    TrendingUp, Droplet, Car, Trash2, Activity,
    Lightbulb, Plus, ArrowRight
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsData, recsData] = await Promise.all([
                dashboardAPI.getStats(),
                dashboardAPI.getRecommendations(),
            ]);
            setStats(statsData);
            setRecommendations(recsData.recommendations);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    const categoryData = [
        { name: 'Energy', value: stats?.energy_saved || 0, color: '#fa709a' },
        { name: 'Water', value: stats?.water_saved || 0, color: '#30cfd0' },
        { name: 'Transport', value: stats?.transport_emissions || 0, color: '#a8edea' },
        { name: 'Waste', value: stats?.waste_reduced || 0, color: '#ff9a9e' },
    ];

    const recentActivityData = stats?.recent_activities?.slice(0, 7).map((activity, index) => ({
        name: new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: activity.value,
    })) || [];

    return (
        <div className="dashboard">
            <div className="container">
                {/* Header */}
                <div className="dashboard-header fade-in">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Track your sustainability progress and impact</p>
                    </div>
                    <Link to="/activities" className="btn btn-primary">
                        <Plus size={20} />
                        Log Activity
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid grid grid-4 fade-in">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'var(--primary-gradient)' }}>
                            <Activity size={24} />
                        </div>
                        <div className="stat-value">{stats?.total_activities || 0}</div>
                        <div className="stat-label">Total Activities</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'var(--energy-gradient)' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div className="stat-value">{stats?.energy_saved?.toFixed(1) || 0}</div>
                        <div className="stat-label">Energy Saved (kWh)</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'var(--water-gradient)' }}>
                            <Droplet size={24} />
                        </div>
                        <div className="stat-value">{stats?.water_saved?.toFixed(1) || 0}</div>
                        <div className="stat-label">Water Saved (L)</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'var(--waste-gradient)' }}>
                            <Trash2 size={24} />
                        </div>
                        <div className="stat-value">{stats?.waste_reduced?.toFixed(1) || 0}</div>
                        <div className="stat-label">Waste Reduced (kg)</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="charts-grid grid grid-2 fade-in">
                    {/* Category Distribution */}
                    <div className="card card-gradient">
                        <h3>Impact by Category</h3>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) =>
                                            percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                                        }
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Activity Trend */}
                    <div className="card card-gradient">
                        <h3>Recent Activity Trend</h3>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={recentActivityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="var(--text-secondary)" />
                                    <YAxis stroke="var(--text-secondary)" />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                    <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                                    <defs>
                                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#667eea" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#764ba2" stopOpacity={0.8} />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <div className="recommendations-section fade-in">
                        <div className="section-header">
                            <div>
                                <h2>Personalized Recommendations</h2>
                                <p>Actions to enhance your sustainability journey</p>
                            </div>
                        </div>

                        <div className="recommendations-grid grid grid-2">
                            {recommendations.map((rec, index) => (
                                <div key={index} className="recommendation-card card">
                                    <div className="rec-header">
                                        <Lightbulb size={24} className="rec-icon" />
                                        <span className={`badge badge-${rec.category}`}>
                                            {rec.category}
                                        </span>
                                    </div>
                                    <h4>{rec.title}</h4>
                                    <p>{rec.description}</p>
                                    <Link to="/activities" className="rec-action">
                                        Take Action <ArrowRight size={16} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Activities */}
                {stats?.recent_activities?.length > 0 && (
                    <div className="recent-activities fade-in">
                        <div className="section-header">
                            <h2>Recent Activities</h2>
                            <Link to="/activities" className="btn btn-secondary">
                                View All
                            </Link>
                        </div>

                        <div className="activities-list">
                            {stats.recent_activities.map((activity) => (
                                <div key={activity.id} className="activity-item card">
                                    <div className={`activity-icon badge-${activity.category}`}>
                                        {activity.category === 'energy' && <TrendingUp size={20} />}
                                        {activity.category === 'water' && <Droplet size={20} />}
                                        {activity.category === 'transport' && <Car size={20} />}
                                        {activity.category === 'waste' && <Trash2 size={20} />}
                                    </div>
                                    <div className="activity-details">
                                        <h4>{activity.action}</h4>
                                        <p>{activity.notes || 'No additional notes'}</p>
                                    </div>
                                    <div className="activity-meta">
                                        <span className="activity-value">
                                            {activity.value} {activity.unit}
                                        </span>
                                        <span className="activity-date">
                                            {new Date(activity.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {stats?.total_activities === 0 && (
                    <div className="empty-state card fade-in">
                        <Activity size={64} className="empty-icon" />
                        <h3>Start Your Sustainability Journey</h3>
                        <p>Log your first activity to see your impact and get personalized recommendations</p>
                        <Link to="/activities" className="btn btn-primary">
                            <Plus size={20} />
                            Log Your First Activity
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
