# SustainLite Frontend

Modern React.js frontend for the SustainLite sustainability tracking application.

## Features

- 🎨 Premium UI with glassmorphism and gradient effects
- 📊 Interactive dashboard with Recharts visualizations
- 🔐 Secure authentication with JWT tokens
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎯 Activity tracking across 4 categories (Energy, Water, Transport, Waste)
- 💡 Personalized recommendations

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Project Structure

```
src/
├── components/       # Reusable components
│   └── Navbar.jsx
├── context/         # React context providers
│   └── AuthContext.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── Activities.jsx
├── services/        # API services
│   └── api.js
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Environment Variables

Create a `.env` file if you need to customize the API URL:

```
VITE_API_URL=http://localhost:8000/api
```

## Design System

The application uses a comprehensive design system with:
- Custom color palette with gradients
- Consistent spacing and typography
- Reusable component styles
- Smooth animations and transitions
- Dark theme optimized for readability

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
