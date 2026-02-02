<<<<<<< HEAD
# SustainLite - Lightweight Sustainability Web Application

A modern, lightweight web application for tracking and managing daily sustainability activities. Built with React.js, FastAPI, and SQLite.

## 📋 Project Overview

SustainLite helps users track their environmental impact across four key categories:
- **Energy** - Monitor electricity and power consumption
- **Water** - Track water usage and conservation
- **Transport** - Log commute and travel emissions
- **Waste** - Record waste reduction and recycling efforts

## ✨ Features

### Core Functionality
- ✅ User registration and secure authentication (JWT)
- ✅ Activity logging across 4 sustainability categories
- ✅ Visual dashboard with statistics and charts
- ✅ Personalized recommendations based on user data
- ✅ Activity history and management

### Technical Highlights
- 🎨 Premium UI with glassmorphism and gradient effects
- 📊 Interactive data visualizations using Recharts
- 🔐 Secure authentication with bcrypt password hashing
- 💾 Lightweight SQLite database
- ⚡ Fast API responses with FastAPI
- 📱 Fully responsive design

## 🏗️ Architecture

### Three-Layer Architecture

1. **Presentation Layer** (Frontend)
   - React.js with Vite
   - Modern component-based architecture
   - Responsive UI with custom design system

2. **Application Layer** (Backend)
   - FastAPI for REST API endpoints
   - JWT-based authentication
   - Business logic and data validation

3. **Data Layer** (Database)
   - SQLite for lightweight data storage
   - SQLAlchemy ORM
   - Efficient querying and transactions

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
sustainlite/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # SQLite database models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # Authentication utilities
│   ├── requirements.txt     # Python dependencies
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.jsx          # Main app
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   └── README.md
└── README.md                # This file
```

## 🔧 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database
- **Pydantic** - Data validation
- **python-jose** - JWT token handling
- **passlib** - Password hashing

## 📊 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login and get JWT token
- `GET /api/users/me` - Get current user profile

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create new activity
- `GET /api/activities/{id}` - Get specific activity
- `DELETE /api/activities/{id}` - Delete activity

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics
- `GET /api/recommendations` - Get personalized recommendations

## 🎨 Design System

The application features a modern design system with:
- Custom color palette with vibrant gradients
- Glassmorphism effects for cards and modals
- Smooth animations and transitions
- Consistent spacing and typography
- Dark theme optimized for readability
- Responsive layouts for all screen sizes

## 🔒 Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected API endpoints
- CORS configuration for frontend-backend communication
- Input validation with Pydantic schemas

## 📈 Development Methodology

The project follows **Agile methodology** with lightweight Scrum practices:
- Iterative development in sprints
- Incremental feature delivery
- Continuous testing and improvement
- Minimal viable product approach
- Focus on user value and simplicity

## 🧪 Testing

### Backend Testing
```bash
cd backend
pytest
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Backend Deployment
The FastAPI backend can be deployed to:
- Heroku
- Railway
- Render
- AWS/GCP/Azure

### Frontend Deployment
The React frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📝 Non-Functional Requirements

- ⚡ Dashboard load time: < 2 seconds
- 🔒 Secure credential handling
- 📱 Responsive on all devices
- ♿ Accessible UI components
- 🎯 Intuitive user experience

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Student ID: 4252553
Date: January 31, 2026

## 🙏 Acknowledgments

- FastAPI documentation
- React.js community
- Recharts library
- Lucide icons

---

**SustainLite** - Making sustainability accessible, one action at a time. 🌱
=======
# Sustainlite
>>>>>>> 3c106f9e861033887f35c48cc8daa92a9fc435b9
