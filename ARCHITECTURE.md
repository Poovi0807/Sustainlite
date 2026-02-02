# SustainLite - Technical Architecture Document

## 1. System Overview

SustainLite is a lightweight web application designed to help users track and manage their daily sustainability activities. The system follows a three-tier architecture pattern with clear separation of concerns.

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React.js Frontend (Vite)                 │  │
│  │                                                        │  │
│  │  Components:                                          │  │
│  │  - Navbar (Navigation)                                │  │
│  │  - Home (Landing Page)                                │  │
│  │  - Login/Register (Authentication)                    │  │
│  │  - Dashboard (Statistics & Charts)                    │  │
│  │  - Activities (CRUD Operations)                       │  │
│  │                                                        │  │
│  │  Context: AuthContext (State Management)              │  │
│  │  Services: API Client (Axios)                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ (JSON)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                FastAPI Backend                        │  │
│  │                                                        │  │
│  │  Endpoints:                                           │  │
│  │  - /api/register (POST)                               │  │
│  │  - /api/login (POST)                                  │  │
│  │  - /api/users/me (GET)                                │  │
│  │  - /api/activities (GET, POST)                        │  │
│  │  - /api/activities/{id} (GET, DELETE)                 │  │
│  │  - /api/dashboard (GET)                               │  │
│  │  - /api/recommendations (GET)                         │  │
│  │                                                        │  │
│  │  Modules:                                             │  │
│  │  - auth.py (JWT, Password Hashing)                    │  │
│  │  - schemas.py (Pydantic Models)                       │  │
│  │  - database.py (ORM Models)                           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SQLAlchemy ORM
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   SQLite Database                     │  │
│  │                  (sustainlite.db)                     │  │
│  │                                                        │  │
│  │  Tables:                                              │  │
│  │  ┌────────────────┐      ┌────────────────┐         │  │
│  │  │     users      │      │   activities   │         │  │
│  │  ├────────────────┤      ├────────────────┤         │  │
│  │  │ id (PK)        │      │ id (PK)        │         │  │
│  │  │ username       │◄─────┤ user_id (FK)   │         │  │
│  │  │ email          │      │ category       │         │  │
│  │  │ hashed_password│      │ action         │         │  │
│  │  │ created_at     │      │ value          │         │  │
│  │  └────────────────┘      │ unit           │         │  │
│  │                          │ date           │         │  │
│  │                          │ notes          │         │  │
│  │                          └────────────────┘         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 3. Technology Stack

### 3.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI library for building components |
| Vite | 7.x | Build tool and dev server |
| React Router | 6.x | Client-side routing |
| Axios | 1.x | HTTP client for API calls |
| Recharts | 2.x | Data visualization library |
| Lucide React | Latest | Icon library |

### 3.2 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.8+ | Programming language |
| FastAPI | 0.109.0 | Web framework |
| Uvicorn | 0.27.0 | ASGI server |
| SQLAlchemy | 2.0.25 | ORM for database operations |
| Pydantic | 2.5.3 | Data validation |
| python-jose | 3.3.0 | JWT token handling |
| passlib | 1.7.4 | Password hashing |

### 3.3 Database

| Technology | Purpose |
|------------|---------|
| SQLite | Lightweight relational database |
| aiosqlite | Async SQLite support |

## 4. Data Models

### 4.1 User Model

```python
class User:
    id: Integer (Primary Key)
    username: String (Unique, Indexed)
    email: String (Unique, Indexed)
    hashed_password: String
    created_at: DateTime
    activities: Relationship -> Activity[]
```

### 4.2 Activity Model

```python
class Activity:
    id: Integer (Primary Key)
    user_id: Integer (Foreign Key -> User.id)
    category: String (energy|water|transport|waste)
    action: String
    value: Float
    unit: String
    date: DateTime
    notes: String (Optional)
    user: Relationship -> User
```

## 5. API Endpoints

### 5.1 Authentication Endpoints

#### POST /api/register
**Request:**
```json
{
  "username": "string",
  "email": "user@example.com",
  "password": "string"
}
```
**Response:** `201 Created`
```json
{
  "id": 1,
  "username": "string",
  "email": "user@example.com",
  "created_at": "2026-01-31T10:00:00"
}
```

#### POST /api/login
**Request:** Form data
```
username: string
password: string
```
**Response:** `200 OK`
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

#### GET /api/users/me
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "string",
  "email": "user@example.com",
  "created_at": "2026-01-31T10:00:00"
}
```

### 5.2 Activity Endpoints

#### POST /api/activities
**Headers:** `Authorization: Bearer <token>`
**Request:**
```json
{
  "category": "energy",
  "action": "Turned off lights",
  "value": 0.5,
  "unit": "kWh",
  "notes": "Optional notes"
}
```
**Response:** `201 Created`

#### GET /api/activities
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 1,
    "category": "energy",
    "action": "Turned off lights",
    "value": 0.5,
    "unit": "kWh",
    "date": "2026-01-31T10:00:00",
    "notes": "Optional notes"
  }
]
```

#### DELETE /api/activities/{id}
**Headers:** `Authorization: Bearer <token>`
**Response:** `204 No Content`

### 5.3 Dashboard Endpoints

#### GET /api/dashboard
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
```json
{
  "total_activities": 10,
  "energy_saved": 5.5,
  "water_saved": 100.0,
  "transport_emissions": 20.0,
  "waste_reduced": 3.0,
  "recent_activities": [...]
}
```

#### GET /api/recommendations
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
```json
{
  "recommendations": [
    {
      "category": "energy",
      "title": "Track Your Energy Usage",
      "description": "Start logging your daily energy consumption...",
      "priority": "high"
    }
  ]
}
```

## 6. Security Architecture

### 6.1 Authentication Flow

```
1. User Registration
   ├─ Client sends username, email, password
   ├─ Server validates input (Pydantic)
   ├─ Server hashes password (bcrypt)
   ├─ Server stores user in database
   └─ Server returns user data (without password)

2. User Login
   ├─ Client sends username, password
   ├─ Server verifies credentials
   ├─ Server generates JWT token (30 min expiry)
   └─ Client stores token in localStorage

3. Authenticated Requests
   ├─ Client includes token in Authorization header
   ├─ Server validates token signature
   ├─ Server extracts user from token
   └─ Server processes request with user context
```

### 6.2 Security Measures

- **Password Security**: bcrypt hashing with salt
- **Token Security**: JWT with HS256 algorithm
- **Input Validation**: Pydantic schemas
- **SQL Injection Prevention**: SQLAlchemy ORM
- **CORS**: Configured for localhost development
- **HTTPS**: Recommended for production

## 7. Frontend Architecture

### 7.1 Component Hierarchy

```
App
├── AuthProvider (Context)
│   └── Router
│       ├── Navbar
│       └── Routes
│           ├── Home
│           ├── Login (PublicRoute)
│           ├── Register (PublicRoute)
│           ├── Dashboard (ProtectedRoute)
│           └── Activities (ProtectedRoute)
```

### 7.2 State Management

- **Authentication State**: React Context (AuthContext)
- **Component State**: useState hooks
- **Server State**: Fetched via API calls
- **Local Storage**: JWT token persistence

### 7.3 Routing Strategy

- **Public Routes**: Accessible without authentication
  - `/` - Home page
  - `/login` - Login page
  - `/register` - Registration page

- **Protected Routes**: Require authentication
  - `/dashboard` - User dashboard
  - `/activities` - Activity management

- **Route Guards**:
  - PublicRoute: Redirects to dashboard if authenticated
  - ProtectedRoute: Redirects to login if not authenticated

## 8. Database Schema

### 8.1 Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 8.2 Activities Table
```sql
CREATE TABLE activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category VARCHAR NOT NULL,
    action VARCHAR NOT NULL,
    value FLOAT NOT NULL,
    unit VARCHAR NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 9. Performance Considerations

### 9.1 Frontend Optimization
- Code splitting with React lazy loading
- Memoization of expensive computations
- Debounced API calls
- Optimized re-renders with React.memo

### 9.2 Backend Optimization
- Async/await for I/O operations
- Database connection pooling
- Indexed database columns
- Efficient SQL queries via ORM

### 9.3 Database Optimization
- Indexed foreign keys
- Indexed unique constraints
- Lightweight SQLite for small-medium scale

## 10. Scalability Path

### 10.1 Current Limitations
- SQLite: Single-file database, limited concurrency
- Local storage: No distributed sessions
- Single server: No load balancing

### 10.2 Future Enhancements
1. **Database Migration**
   - PostgreSQL for production
   - Connection pooling
   - Read replicas

2. **Caching Layer**
   - Redis for session storage
   - Cache frequently accessed data
   - Reduce database load

3. **Microservices**
   - Separate authentication service
   - Separate analytics service
   - API gateway

4. **Deployment**
   - Docker containerization
   - Kubernetes orchestration
   - CDN for static assets

## 11. Testing Strategy

### 11.1 Backend Testing
- Unit tests for business logic
- Integration tests for API endpoints
- Database tests with test fixtures
- Authentication flow tests

### 11.2 Frontend Testing
- Component unit tests (Jest)
- Integration tests (React Testing Library)
- E2E tests (Playwright/Cypress)
- Visual regression tests

## 12. Deployment Architecture

### 12.1 Development
```
Frontend: http://localhost:5173 (Vite dev server)
Backend: http://localhost:8000 (Uvicorn)
Database: ./sustainlite.db (SQLite file)
```

### 12.2 Production (Recommended)
```
Frontend: Vercel/Netlify (Static hosting)
Backend: Railway/Render (Container hosting)
Database: PostgreSQL (Managed database)
CDN: Cloudflare (Static assets)
```

## 13. Monitoring & Logging

### 13.1 Backend Logging
- Request/response logging
- Error tracking
- Performance metrics
- Database query logging

### 13.2 Frontend Monitoring
- Error boundary for React errors
- API call tracking
- User interaction analytics
- Performance monitoring

## 14. Conclusion

SustainLite demonstrates a modern, lightweight architecture suitable for small to medium-scale applications. The three-tier architecture provides clear separation of concerns, while the technology choices prioritize simplicity, performance, and developer experience.

The system is designed to be:
- **Lightweight**: Minimal dependencies, fast load times
- **Scalable**: Clear path to production-grade infrastructure
- **Secure**: Industry-standard authentication and data protection
- **Maintainable**: Clean code structure, comprehensive documentation
- **User-friendly**: Intuitive interface, responsive design

---

**Document Version**: 1.0  
**Last Updated**: January 31, 2026  
**Author**: SustainLite Development Team
