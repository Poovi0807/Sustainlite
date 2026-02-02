# SustainLite Backend

FastAPI backend for the SustainLite sustainability tracking application.

## Features

- User authentication with JWT tokens
- SQLite database for lightweight data storage
- Activity tracking (energy, water, transport, waste)
- Dashboard statistics
- Personalized recommendations

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

Or use uvicorn directly:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database

The application uses SQLite with the database file `sustainlite.db` created automatically on first run.
