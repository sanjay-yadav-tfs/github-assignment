# Frontend Development Guide - User Onboarding & Approval Platform# Frontend Development Guide — User Onboarding & Approval Platform



## 🎯 Project Overview## Overview

This document provides implementation details for the **frontend** (React) of the User Onboarding and Approval Platform.

A modern React-based frontend application for user onboarding and admin management with comprehensive authentication, user management, and approval workflows. Built with React 18, Vite, and Tailwind CSS.

## Tech Stack

## ✨ Complete Feature Set- ReactJS (Vite or CRA)

- React Router

### User Features- Axios (API requests)

- 🔐 **User Registration** - Complete form with validation- JWT handling (localStorage/sessionStorage)

- 👤 **User Login** - JWT-based authentication- TailwindCSS or Material UI (UI styling)

- 📊 **Profile Management** - View and update personal information

- 🔄 **Status Tracking** - Real-time approval status monitoring## Features

### User

### Admin Features- Registration form

- 🛡️ **Admin Dashboard** - Comprehensive user management interface- Login form

- ✅ **User Approval Workflow** - Approve/reject pending users- Profile page (show status: PENDING / APPROVED / REJECTED)

- 📈 **User Overview** - Complete user listing with status filters

- 🔍 **Search & Filter** - Advanced user search capabilities### Admin

- Admin login page

### Technical Features- Admin dashboard

- 📱 **Responsive Design** - Mobile-first approach- Pending users table

- ⚡ **Fast Performance** - Vite for lightning-fast development- Approve / Reject actions

- 🎨 **Modern UI** - Clean interface with Tailwind CSS

- 🔒 **Secure** - Protected routes and authentication## Project Structure

- 🧪 **Well Tested** - Comprehensive test coverage```

frontend/

## 🛠 Tech Stack├─ src/

│  ├─ pages/

- **Framework**: React 18+ with Hooks│  │  ├─ AdminLogin.jsx

- **Build Tool**: Vite 5.x│  │  ├─ AdminDashboard.jsx

- **Styling**: Tailwind CSS 3.x│  │  ├─ UserLogin.jsx

- **HTTP Client**: Axios 1.x│  │  ├─ UserRegister.jsx

- **Routing**: React Router DOM 6.x│  │  └─ UserProfile.jsx

- **Icons**: Lucide React 0.x│  ├─ components/

- **Testing**: Vitest + React Testing Library│  │  ├─ PendingUsersTable.jsx

- **State Management**: React Context API│  │  ├─ ApproveRejectButtons.jsx

│  ├─ api/

## 📁 Complete Project Structure│  │  ├─ auth.js

│  │  ├─ users.js

```│  ├─ App.jsx

frontend/│  └─ main.jsx

├── src/├─ Dockerfile

│   ├── api/                    # API service functions├─ package.json

│   │   ├── auth.js            # Authentication API calls└─ README.md

│   │   ├── users.js           # User management API calls```

│   │   └── index.js           # Axios configuration & interceptors
│   ├── components/            # Reusable UI components
│   │   ├── ApproveRejectButtons.jsx   # Admin action buttons
│   │   ├── Navbar.jsx         # Navigation component
│   │   ├── PendingUsersTable.jsx     # User table component
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── hooks/                 # Custom React hooks
│   │   └── useAuth.jsx        # Authentication hook with context
│   ├── pages/                 # Page components
│   │   ├── AdminDashboard.jsx # Admin management interface
│   │   ├── AdminLogin.jsx     # Admin authentication
│   │   ├── Home.jsx           # Landing page
│   │   ├── UserLogin.jsx      # User authentication
│   │   ├── UserProfile.jsx    # User profile management
│   │   └── UserRegister.jsx   # User registration
│   ├── test/                  # Test files
│   │   ├── basic.test.js      # Simple test cases
│   │   └── setup.js           # Test environment setup
│   ├── utils/                 # Utility functions
│   │   └── helpers.js         # Common helper functions
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles with Tailwind
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.js             # Vite configuration
├── vitest.config.js           # Test configuration
└── README.md                  # Documentation
```

## 🔗 Application Routes

### Public Routes
- `/` - Home page with navigation
- `/login` - User login form
- `/register` - User registration form

### Protected Routes (User)
- `/profile` - User profile management and status

### Protected Routes (Admin)
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Admin dashboard with user management

## 🎨 Component Architecture

### Core Components

#### **Navbar.jsx** - Navigation Component
```jsx
// Features: Authentication status, role-based navigation, logout
import { Shield, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-white shadow-sm border-b">
      {/* Role-based navigation items */}
      {/* Authentication status display */}
      {/* Logout functionality */}
    </nav>
  );
}
```

#### **ProtectedRoute.jsx** - Route Protection
```jsx
// Features: Authentication validation, role-based access
import { useAuth } from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (requireAdmin && user.role !== 'ADMIN') return <Navigate to="/" />;
  
  return children;
}
```

#### **ApproveRejectButtons.jsx** - Admin Actions
```jsx
// Features: User approval/rejection with confirmation modals
import { Check, X } from 'lucide-react';

function ApproveRejectButtons({ user, onApprove, onReject, disabled }) {
  return (
    <div className="flex space-x-2">
      <button onClick={() => onApprove(user.id)} disabled={disabled}>
        <Check className="w-4 h-4" /> Approve
      </button>
      <button onClick={() => onReject(user.id)} disabled={disabled}>
        <X className="w-4 h-4" /> Reject
      </button>
    </div>
  );
}
```

### Page Components

#### **UserRegister.jsx** - Registration Form
- Complete form validation
- Password strength requirements
- Real-time error display
- Success feedback with redirect

#### **AdminDashboard.jsx** - User Management
- Pending users overview
- User approval/rejection workflow
- Real-time status updates
- Statistics display

## 🔌 API Integration

### Authentication API (`src/api/auth.js`)
```javascript
import api from './index.js';

export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  adminLogin: async (credentials) => {
    const response = await api.post('/auth/admin/login', credentials);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};
```

### Users API (`src/api/users.js`)
```javascript
import api from './index.js';

export const usersAPI = {
  getPendingUsers: async () => {
    const response = await api.get('/users/pending');
    return response.data;
  },
  
  getApprovedUsers: async () => {
    const response = await api.get('/users/approved');
    return response.data;
  },
  
  approveRejectUser: async (id, action, rejectionReason = null) => {
    const response = await api.post(`/users/${id}/approve-reject`, {
      action, rejectionReason
    });
    return response.data;
  }
};
```

### Axios Configuration (`src/api/index.js`)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## 🔒 Authentication Flow

### useAuth Hook (`src/hooks/useAuth.jsx`)
```jsx
import { useState, useEffect, createContext, useContext } from 'react';
import { authAPI } from '../api/auth.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (credentials, isAdmin = false) => {
    const response = isAdmin 
      ? await authAPI.adminLogin(credentials)
      : await authAPI.login(credentials);
    
    setToken(response.data.token);
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = { user, token, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 🎨 Styling & Design System

### Tailwind CSS Configuration (`tailwind.config.js`)
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb' },
        success: { 500: '#10b981', 600: '#059669' },
        error: { 500: '#ef4444', 600: '#dc2626' }
      }
    }
  }
}
```

## 🧪 Testing Strategy

### Test Configuration (`vitest.config.js`)
```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true
  }
})
```

### Test Examples (`src/test/basic.test.js`)
```javascript
import { describe, test, expect } from 'vitest'

describe('Frontend Tests', () => {
  test('basic functionality works', () => {
    expect(2 + 2).toBe(4)
  })
  
  test('async operations work', async () => {
    const result = await Promise.resolve('test')
    expect(result).toBe('test')
  })
})
```

## 🚀 Development Setup

### Prerequisites
- Node.js 18+
- npm 8+
- Backend API running on http://localhost:3000

### Installation Steps
```bash
# 1. Clone repository
git clone <repository-url>
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:5173
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run test suite
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "axios": "^1.6.1",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.7.0",
    "vite": "^5.0.8",
    "vitest": "^3.2.4",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.9.1",
    "tailwindcss": "^3.3.5",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31"
  }
}
```

## 🔧 Configuration Files

### Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

## 🚀 Production Deployment

### Build Process
```bash
npm ci
npm run build
npm run preview
```

### Environment Configuration
```bash
# Production environment variables
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: AWS CloudFront, Azure CDN
- **Container**: Docker with nginx

## 📱 Responsive Design Breakpoints

```css
/* Mobile first (default) - 320px+ */
.container { padding: 1rem; }

/* Tablets - 768px+ */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop - 1024px+ */
@media (min-width: 1024px) {
  .container { padding: 3rem; }
}
```

## 🎯 Developer Requirements & Prompt Expectations

### Expected Input for Similar Project Creation

```markdown
## Project Requirements
- User authentication system (register/login with JWT)
- Admin dashboard for user management
- User profile management with real-time status
- Approval workflow (pending/approved/rejected states)
- Responsive design for all devices
- Modern React architecture with hooks
- Comprehensive testing coverage

## Technical Specifications
- React 18+ with functional components and hooks
- Vite as build tool for fast development
- Tailwind CSS for utility-first styling
- React Router DOM for client-side navigation
- Axios for HTTP client with interceptors
- Vitest for testing framework
- JWT-based authentication with localStorage
- Context API for state management

## Features to Implement
1. User registration with form validation
2. User login with JWT token handling
3. Admin login with role-based access control
4. User profile display and editing capabilities
5. Admin dashboard with pending user management
6. User approval/rejection workflow with reasons
7. Protected routes for authentication levels
8. Responsive design for mobile/tablet/desktop
9. Error handling and loading states
10. Real-time status updates

## API Integration Requirements
- RESTful API endpoints for authentication
- User management CRUD operations
- Admin-specific endpoints for approvals
- Error handling with proper HTTP status codes
- Token management and automatic refresh
- Request/response interceptors for global handling

## Testing Requirements
- Unit tests for all components with React Testing Library
- Integration tests for API calls with MSW
- Component rendering and interaction tests
- Mock service worker for API testing
- Coverage reporting and CI integration
```

### Development Steps for Similar Project
1. **Project Initialization**
   ```bash
   npm create vite@latest frontend -- --template react
   cd frontend && npm install
   npm install axios react-router-dom lucide-react
   npm install -D tailwindcss postcss autoprefixer vitest
   ```

2. **Configure Build Tools**
   - Set up Tailwind CSS with PostCSS
   - Configure Vite for development and production
   - Set up Vitest for testing environment

3. **Implement Authentication**
   - Create AuthContext with useAuth hook
   - Implement login/register forms with validation
   - Set up JWT token management
   - Create protected route components

4. **Build UI Components**
   - Design reusable components with Tailwind
   - Implement responsive navigation
   - Create form components with validation
   - Build admin dashboard interface

5. **Add API Integration**
   - Set up Axios with base configuration
   - Create API service modules
   - Implement request/response interceptors
   - Add error handling and loading states

6. **Implement Testing**
   - Set up testing environment with Vitest
   - Write component tests with React Testing Library
   - Add API integration tests
   - Configure coverage reporting

## 🔐 Security Best Practices

- **Input Validation** - Client-side form validation with server-side verification
- **XSS Protection** - Sanitize user inputs and use proper escaping
- **Token Storage** - Secure JWT storage with automatic cleanup
- **HTTPS Ready** - All configurations prepared for secure connections
- **Route Protection** - Authentication-based access control

## 🤝 Contributing Guidelines

### Code Standards
- Use functional components with hooks
- Follow React best practices and patterns
- Write comprehensive tests for all features
- Use semantic HTML with proper ARIA labels

### Git Workflow
1. Fork repository
2. Create feature branch
3. Implement changes with tests
4. Submit pull request
5. Code review and merge

This comprehensive guide provides everything needed to recreate or extend the frontend application with all essential features, configurations, and best practices included.