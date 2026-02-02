import React, { useState, useEffect } from 'react';
import { activitiesAPI } from '../services/api';
import {
    Plus, TrendingUp, Droplet, Car, Trash2,
    Calendar, X, Check, AlertCircle
} from 'lucide-react';
import './Activities.css';

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        category: 'energy',
        action: '',
        value: '',
        unit: 'kWh',
        notes: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const categoryIcons = {
        energy: TrendingUp,
        water: Droplet,
        transport: Car,
        waste: Trash2,
    };

    const categoryUnits = {
        energy: ['kWh', 'Wh', 'MWh'],
        water: ['L', 'mL', 'gal'],
        transport: ['km', 'mi', 'kg CO2'],
        waste: ['kg', 'g', 'lbs'],
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const data = await activitiesAPI.getAll();
            setActivities(data);
        } catch (error) {
            console.error('Failed to fetch activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Update unit when category changes
        if (name === 'category') {
            setFormData({
                ...formData,
                category: value,
                unit: categoryUnits[value][0],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.action || !formData.value) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            await activitiesAPI.create({
                ...formData,
                value: parseFloat(formData.value),
            });

            setSuccess('Activity logged successfully!');
            setShowModal(false);
            setFormData({
                category: 'energy',
                action: '',
                value: '',
                unit: 'kWh',
                notes: '',
            });
            fetchActivities();

            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError(error.response?.data?.detail || 'Failed to log activity');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this activity?')) {
            return;
        }

        try {
            await activitiesAPI.delete(id);
            setActivities(activities.filter((a) => a.id !== id));
            setSuccess('Activity deleted successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError('Failed to delete activity');
        }
    };

    const getCategoryIcon = (category) => {
        const Icon = categoryIcons[category] || TrendingUp;
        return <Icon size={20} />;
    };

    if (loading) {
        return (
            <div className="activities-loading">
                <div className="loading-spinner"></div>
                <p>Loading activities...</p>
            </div>
        );
    }

    return (
        <div className="activities-page">
            <div className="container">
                {/* Header */}
                <div className="activities-header fade-in">
                    <div>
                        <h1>Activities</h1>
                        <p>Log and track your sustainability actions</p>
                    </div>
                    <button onClick={() => setShowModal(true)} className="btn btn-primary">
                        <Plus size={20} />
                        Log Activity
                    </button>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="alert alert-success fade-in">
                        <Check size={20} />
                        <span>{success}</span>
                    </div>
                )}

                {error && !showModal && (
                    <div className="alert alert-error fade-in">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Activities List */}
                {activities.length > 0 ? (
                    <div className="activities-grid grid grid-2 fade-in">
                        {activities.map((activity) => (
                            <div key={activity.id} className="activity-card card card-gradient">
                                <div className="activity-card-header">
                                    <div className={`activity-category-icon badge-${activity.category}`}>
                                        {getCategoryIcon(activity.category)}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(activity.id)}
                                        className="delete-btn"
                                        title="Delete activity"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="activity-card-body">
                                    <span className={`badge badge-${activity.category}`}>
                                        {activity.category}
                                    </span>
                                    <h3>{activity.action}</h3>
                                    <div className="activity-value-display">
                                        <span className="value">{activity.value}</span>
                                        <span className="unit">{activity.unit}</span>
                                    </div>
                                    {activity.notes && (
                                        <p className="activity-notes">{activity.notes}</p>
                                    )}
                                </div>

                                <div className="activity-card-footer">
                                    <div className="activity-date">
                                        <Calendar size={16} />
                                        <span>{new Date(activity.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state card fade-in">
                        <TrendingUp size={64} className="empty-icon" />
                        <h3>No Activities Yet</h3>
                        <p>Start logging your sustainability activities to track your impact</p>
                        <button onClick={() => setShowModal(true)} className="btn btn-primary">
                            <Plus size={20} />
                            Log Your First Activity
                        </button>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Log New Activity</h2>
                                <button onClick={() => setShowModal(false)} className="modal-close">
                                    <X size={24} />
                                </button>
                            </div>

                            {error && (
                                <div className="alert alert-error">
                                    <AlertCircle size={20} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="activity-form">
                                <div className="input-group">
                                    <label className="input-label">Category</label>
                                    <select
                                        name="category"
                                        className="input"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="energy">Energy</option>
                                        <option value="water">Water</option>
                                        <option value="transport">Transport</option>
                                        <option value="waste">Waste</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Action</label>
                                    <input
                                        type="text"
                                        name="action"
                                        className="input"
                                        placeholder="e.g., Turned off lights, Used public transport"
                                        value={formData.action}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <label className="input-label">Value</label>
                                        <input
                                            type="number"
                                            name="value"
                                            className="input"
                                            placeholder="0.0"
                                            step="0.1"
                                            value={formData.value}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label className="input-label">Unit</label>
                                        <select
                                            name="unit"
                                            className="input"
                                            value={formData.unit}
                                            onChange={handleChange}
                                            required
                                        >
                                            {categoryUnits[formData.category].map((unit) => (
                                                <option key={unit} value={unit}>
                                                    {unit}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Notes (Optional)</label>
                                    <textarea
                                        name="notes"
                                        className="input textarea"
                                        placeholder="Add any additional details..."
                                        rows="3"
                                        value={formData.notes}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="btn btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <Check size={20} />
                                        Log Activity
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Activities;
