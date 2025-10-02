# User Onboarding & Approval Platform

A complete full-stack application for managing user onboarding and approval workflows with admin capabilities.

## 🎯 Project Overview

This project provides a comprehensive user onboarding platform where users can register, and admins can approve or reject their applications. Built with modern technologies including React, Node.js, Express.js, and Azure SQL Database.

## ✨ Features

### User Features
- 🔐 **User Registration** - Complete registration with validation
- 👤 **Profile Management** - Update personal information
- 📊 **Status Tracking** - Track approval status in real-time
- 🔑 **Secure Authentication** - JWT-based authentication

### Admin Features
- 🛡️ **Admin Dashboard** - Comprehensive user management interface
- ✅ **User Approval** - Approve or reject pending users
- 📈 **User Overview** - View all users and their statuses
- 🔍 **Search & Filter** - Find users efficiently

### Technical Features
- 🚀 **Full-Stack Solution** - Complete frontend and backend
- 📱 **Responsive Design** - Works on all devices
- 🔒 **Secure** - Password hashing, JWT tokens, input validation
- 🧪 **Well Tested** - Comprehensive test suites
- 📚 **Well Documented** - Complete documentation

## 🛠 Tech Stack

### Frontend
- **React 18+** - Modern React with Hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Vitest** - Testing framework

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **Azure SQL Database** - Cloud database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Jest** - Testing framework

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Azure SQL Database (or SQL Server)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-assignment
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file with your database credentials
   cp .env.example .env
   # Edit .env with your Azure SQL Database details
   
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

### Default Admin Credentials

- **Email**: admin@example.com
- **Password**: admin123

## 📁 Project Structure

```
github-assignment/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── tests/              # Backend tests
│   ├── .env.example        # Environment template
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── api/           # API service functions
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utilities
│   ├── tests/             # Frontend tests
│   └── package.json
├── run-all-tests.bat      # Test runner script (Windows)
├── run-all-tests.sh       # Test runner script (Unix)
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/profile` - Get user profile

### User Management (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/pending` - Get pending users
- `PUT /api/users/:id/approve` - Approve user
- `PUT /api/users/:id/reject` - Reject user

## 🧪 Testing

### Run All Tests
```bash
# Windows
.\run-all-tests.bat

# Unix/Linux/Mac
./run-all-tests.sh
```

### Individual Test Suites
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 🔧 Development

### Environment Configuration

#### Backend (.env)
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-jwt-secret
DB_HOST=your-azure-sql-server.database.windows.net
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
```

#### Frontend (optional .env)
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Available Scripts

#### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔒 Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Stateless authentication
- **Input Validation** - Server-side validation with express-validator
- **CORS Protection** - Configured for frontend origin
- **Security Headers** - Helmet.js for security headers
- **Rate Limiting** - API rate limiting protection

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**
   - Set production database credentials
   - Generate strong JWT secret
   - Configure CORS for production domain

2. **Build Frontend**
   ```bash
   cd frontend && npm run build
   ```

3. **Database Setup**
   - Ensure Azure SQL Database is configured
   - Run database migrations if needed

4. **Security**
   - Enable HTTPS
   - Configure firewalls
   - Set up monitoring

### Deployment Options

- **Backend**: Azure App Service, Heroku, AWS EC2
- **Frontend**: Netlify, Vercel, Azure Static Web Apps
- **Database**: Azure SQL Database (already configured)

## 🔄 User Workflow

### User Registration Flow
1. User visits registration page
2. Fills out registration form
3. Account created with "PENDING" status
4. User waits for admin approval
5. Admin approves/rejects from dashboard
6. User receives access to profile

### Admin Workflow
1. Admin logs in with admin credentials
2. Views pending users in dashboard
3. Reviews user information
4. Approves or rejects users
5. Monitors user statuses

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `firstName` - User's first name
- `lastName` - User's last name
- `email` - Unique email address
- `password` - Hashed password
- `role` - USER or ADMIN
- `status` - PENDING, APPROVED, REJECTED
- `createdAt` - Registration timestamp
- `updatedAt` - Last modification timestamp

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

1. Check the README files in `/backend` and `/frontend` directories
2. Review the API documentation
3. Check existing issues in the repository
4. Create a new issue if needed

## 🎉 Getting Started

1. **Clone the repository**
2. **Follow the Quick Start guide**
3. **Run the tests to ensure everything works**
4. **Start developing!**

Happy coding! 🚀