# User Onboarding & Approval Platform - Frontend

A modern React frontend application for user onboarding and admin management with a clean, responsive interface.

## 🎯 Project Overview

This frontend application provides a comprehensive user interface for the user onboarding platform. Built with React, Vite, and Tailwind CSS, it offers both user and admin experiences with authentication, user management, and approval workflows.

## ✨ Features

- 🔐 **Authentication System** - Login/Register with JWT
- 👤 **User Dashboard** - Profile management and status tracking
- 🛡️ **Admin Panel** - User approval/rejection workflow
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI** - Clean and intuitive interface
- ⚡ **Fast Performance** - Vite for lightning-fast development
- 🔄 **Real-time Updates** - Dynamic status updates
- ✅ **Form Validation** - Client-side validation for better UX

## 🛠 Tech Stack

- **Framework**: React 18+ with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **State Management**: React Context API

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm
- Backend API running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the frontend directory (optional):
   
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
   
   **Note**: The frontend is configured to work with the backend API at `http://localhost:3000/api` by default.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/              # API service functions
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── test/             # Test files
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 🔗 Application Routes

### Public Routes
- `/` - Home page
- `/login` - User login
- `/register` - User registration

### Protected Routes (User)
- `/profile` - User profile management

### Protected Routes (Admin)
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard with user management

## 🎨 UI Components

### Core Components
- **Navbar** - Navigation with authentication status
- **ProtectedRoute** - Route guard for authenticated users
- **ApproveRejectButtons** - Admin action buttons
- **PendingUsersTable** - Table for pending user approvals

### Pages
- **Home** - Landing page with navigation
- **UserLogin** - User authentication form
- **UserRegister** - User registration form
- **UserProfile** - Profile management interface
- **AdminLogin** - Admin authentication
- **AdminDashboard** - User management interface

## 🔌 API Integration

The frontend integrates with the backend API through service modules:

### Authentication API (`src/api/auth.js`)
- User login/logout
- User registration
- Admin authentication
- Profile management

### Users API (`src/api/users.js`)
- Get pending users
- Get approved users
- Approve/reject users
- User profile operations

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run test suite
- `npm run lint` - Run ESLint (if configured)

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3000/api` |

## 🎨 Styling

The application uses Tailwind CSS for styling with:

- **Responsive Design** - Mobile-first approach
- **Component-based Styling** - Reusable style patterns
- **Dark Mode Ready** - Prepared for dark theme
- **Custom Components** - Button, form, and layout components

### Key Design Principles

1. **Consistency** - Uniform spacing, colors, and typography
2. **Accessibility** - ARIA labels and keyboard navigation
3. **Performance** - Optimized CSS with Tailwind's purge
4. **Maintainability** - Component-based architecture

## 🔒 Authentication Flow

1. **User Registration**
   - Fill registration form
   - Submit to backend API
   - Receive pending status
   - Wait for admin approval

2. **User Login**
   - Submit credentials
   - Receive JWT token
   - Store in localStorage
   - Redirect to profile

3. **Admin Login**
   - Admin-specific login form
   - JWT token with admin role
   - Access to admin dashboard

4. **Session Management**
   - Automatic token validation
   - Token refresh handling
   - Secure logout

## 🚀 Deployment

### Production Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

1. **Static Hosting** (Netlify, Vercel, GitHub Pages)
2. **CDN** (AWS CloudFront, Azure CDN)
3. **Web Server** (nginx, Apache)
4. **Container** (Docker with nginx)

### Environment Configuration

For production deployment:

1. Set `VITE_API_BASE_URL` to your production API URL
2. Configure CORS on the backend for your domain
3. Ensure HTTPS for security
4. Set up proper caching headers

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile** (320px+) - Phone devices
- **Tablet** (768px+) - iPad and similar
- **Desktop** (1024px+) - Laptop and desktop
- **Large Desktop** (1280px+) - Large screens

## 🔐 Security Features

- **Input Validation** - Client-side form validation
- **XSS Protection** - Sanitized user inputs
- **Secure Storage** - JWT tokens in localStorage
- **HTTPS Ready** - Prepared for secure connections
- **Error Handling** - Graceful error management

## 🎯 User Experience

### User Journey
1. **Registration** → **Pending Approval** → **Profile Access**
2. **Login** → **Dashboard** → **Profile Management**

### Admin Journey
1. **Admin Login** → **Dashboard** → **User Management**
2. **Review Users** → **Approve/Reject** → **Monitor Status**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.