import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Leaf, TrendingUp, Droplet, Car, Trash2,
    BarChart3, Lightbulb, Shield, ArrowRight
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();

    const features = [
        {
            icon: BarChart3,
            title: 'Track Your Impact',
            description: 'Monitor your daily sustainability activities across energy, water, transport, and waste categories.',
            gradient: 'var(--primary-gradient)',
        },
        {
            icon: Lightbulb,
            title: 'Get Recommendations',
            description: 'Receive personalized insights and actionable tips to enhance your environmental impact.',
            gradient: 'var(--energy-gradient)',
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Your data is safely stored with industry-standard encryption and authentication.',
            gradient: 'var(--water-gradient)',
        },
    ];

    const categories = [
        { icon: TrendingUp, name: 'Energy', color: '#fa709a', description: 'Track electricity and power usage' },
        { icon: Droplet, name: 'Water', color: '#30cfd0', description: 'Monitor water conservation' },
        { icon: Car, name: 'Transport', color: '#a8edea', description: 'Log commute and travel emissions' },
        { icon: Trash2, name: 'Waste', color: '#ff9a9e', description: 'Record waste reduction efforts' },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content fade-in">
                        <div className="hero-badge">
                            <Leaf size={20} />
                            <span>Lightweight Sustainability Tracking</span>
                        </div>
                        <h1 className="hero-title">
                            Make Every Action Count for a
                            <span className="text-gradient"> Sustainable Future</span>
                        </h1>
                        <p className="hero-description">
                            SustainLite helps you track, analyze, and improve your daily environmental impact
                            with an intuitive interface and powerful insights.
                        </p>
                        <div className="hero-actions">
                            {isAuthenticated ? (
                                <Link to="/dashboard" className="btn btn-primary btn-lg">
                                    Go to Dashboard
                                    <ArrowRight size={20} />
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn-primary btn-lg">
                                        Get Started Free
                                        <ArrowRight size={20} />
                                    </Link>
                                    <Link to="/login" className="btn btn-outline btn-lg">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header text-center fade-in">
                        <h2>Why Choose SustainLite?</h2>
                        <p>Everything you need to track and improve your sustainability journey</p>
                    </div>

                    <div className="features-grid grid grid-3 fade-in">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card card">
                                <div className="feature-icon" style={{ background: feature.gradient }}>
                                    <feature.icon size={28} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header text-center fade-in">
                        <h2>Track Multiple Categories</h2>
                        <p>Comprehensive monitoring across all aspects of sustainable living</p>
                    </div>

                    <div className="categories-grid grid grid-4 fade-in">
                        {categories.map((category, index) => (
                            <div key={index} className="category-card card">
                                <div
                                    className="category-icon"
                                    style={{
                                        background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}99 100%)`
                                    }}
                                >
                                    <category.icon size={32} />
                                </div>
                                <h4>{category.name}</h4>
                                <p>{category.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card card fade-in">
                        <div className="cta-content">
                            <h2>Start Your Sustainability Journey Today</h2>
                            <p>
                                Join thousands of users making a positive impact on the environment,
                                one action at a time.
                            </p>
                            {!isAuthenticated && (
                                <Link to="/register" className="btn btn-primary btn-lg">
                                    Create Free Account
                                    <ArrowRight size={20} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <Leaf size={24} />
                            <span>SustainLite</span>
                        </div>
                        <p>© 2026 SustainLite. Making sustainability accessible for everyone.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
