# User Onboarding & Approval Platform - Project Summary

## 🚀 Project Overview
A full-stack web application for user registration and admin-managed approval workflows. Users can register accounts that require admin approval before gaining access to the platform.

## ✨ Key Features

### User Features
- **User Registration** - Secure account creation with validation
- **User Login** - JWT-based authentication system
- **Profile Management** - View personal information and approval status
- **Status Tracking** - Real-time approval status monitoring

### Admin Features
- **Admin Dashboard** - Comprehensive user management interface
- **User Approval** - Approve or reject pending user registrations
- **User Overview** - View all users with status filtering
- **Statistics** - User count and approval metrics

### System Features
- **Role-Based Access** - USER and ADMIN role management
- **Responsive Design** - Mobile-friendly interface
- **Secure Authentication** - JWT tokens with protected routes
- **Input Validation** - Comprehensive form validation
- **Error Handling** - User-friendly error messages
- **Logging System** - Complete audit trail

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18+ with Hooks
- **Build Tool**: Vite 5.x
- **Styling**: Tailwind CSS 3.x
- **HTTP Client**: Axios 1.x
- **Routing**: React Router DOM 6.x
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Database**: Azure SQL Database
- **ORM**: Sequelize 6.x
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator 7.x
- **Logging**: Winston 3.x
- **Testing**: Jest 29.x + Supertest

### Database Schema
- **User Model** with roles (USER, ADMIN)
- **Status Management** (PENDING, APPROVED, REJECTED)
- **Audit Fields** (timestamps, last login)
- **Validation Rules** (email format, password strength)

### Development & Deployment
- **Containerization**: Docker
- **Process Management**: PM2 ready
- **Security**: Helmet.js, CORS, Rate limiting
- **Environment**: Environment-based configuration
- **CI/CD**: Test automation ready

## 🏗 Architecture
- **Frontend**: Single Page Application (SPA) with React
- **Backend**: RESTful API with layered architecture
- **Database**: Relational database with ORM
- **Authentication**: Stateless JWT-based auth
- **Deployment**: Containerized microservices architecture

## 📋 User Workflow
1. User registers with personal information
2. Account status set to PENDING
3. Admin reviews registration in dashboard
4. Admin approves or rejects with optional reason
5. User can login only after approval
6. Approved users access profile and features