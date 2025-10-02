# User Onboarding & Approval Platform - Backend

A robust Node.js backend service for managing user onboarding and approval workflows with admin capabilities.

## 🎯 Project Overview

This backend service provides a complete user onboarding system with admin approval workflow, built with Node.js, Express.js, and Azure SQL Database. It features JWT authentication, role-based access control, and comprehensive user management capabilities.

## ✨ Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👥 **User Management** - Registration, approval/rejection workflow  
- 🛡️ **Role-Based Access Control** - Admin and User roles
- 📊 **Azure SQL Database** - Cloud-based database with Sequelize ORM
- 🔍 **User Search & Filtering** - Advanced search capabilities
-  **Production Ready** - Security, logging, rate limiting
- ✅ **Testing** - Comprehensive test suite with Jest

## 🛠 Tech Stack

- **Runtime**: Node.js 18+ + Express.js
- **Database**: Azure SQL Database with Sequelize ORM
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston + Morgan
- **Testing**: Jest

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Azure SQL Database (or SQL Server)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the backend directory with the following variables:
   
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=3000
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=24h
   
   # Azure SQL Database Configuration
   DB_HOST=your-azure-sql-server.database.windows.net
   DB_PORT=1433
   DB_NAME=your-database-name
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_ENCRYPT=true
   DB_TRUST_SERVER_CERTIFICATE=false
   
   # CORS Configuration
   FRONTEND_URL=http://localhost:5173
   ```

   **⚠️ Important**: Never commit `.env` files to version control. The `.env` file should contain your actual database credentials and secrets.

4. **Database Setup**
   
   The application will automatically:
   - Test the database connection
   - Sync database schema
   - Create an admin user on first run
   
   Default admin credentials:
   - Email: `admin@example.com`
   - Password: `admin123`

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database and configuration
│   ├── controllers/     # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utilities and middleware
│   └── workers/         # Background workers
├── tests/               # Test files
├── .env.example         # Environment template
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/profile` - Get user profile

### User Management (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/pending` - Get pending users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id/approve` - Approve user
- `PUT /api/users/:id/reject` - Reject user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /api/health` - Server health status

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🔧 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite
- `npm run lint` - Run ESLint (if configured)

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | `development` |
| `PORT` | Server port | No | `3000` |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_EXPIRES_IN` | JWT expiration | No | `24h` |
| `DB_HOST` | Database host | Yes | - |
| `DB_PORT` | Database port | No | `1433` |
| `DB_NAME` | Database name | Yes | - |
| `DB_USER` | Database user | Yes | - |
| `DB_PASSWORD` | Database password | Yes | - |
| `FRONTEND_URL` | Frontend URL for CORS | No | `http://localhost:5173` |

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting
- **Input Validation** - Request validation with express-validator
- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Stateless authentication

## 🏗 Architecture

The backend follows a layered architecture:

1. **Routes** - Handle HTTP requests and responses
2. **Controllers** - Process requests and coordinate with services
3. **Services** - Business logic and data processing
4. **Models** - Database models and relationships
5. **Utils** - Shared utilities and middleware

## 🚀 Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Configure production database
3. Set strong JWT secret
4. Configure HTTPS
5. Set up monitoring and logging
6. Configure reverse proxy (nginx)

### Azure Deployment

1. Create Azure SQL Database
2. Deploy to Azure App Service or Container Instance
3. Configure environment variables in Azure
4. Set up SSL/TLS certificates

## 📝 API Documentation

The API follows RESTful conventions:

- **GET** - Retrieve data
- **POST** - Create new resources
- **PUT** - Update existing resources
- **DELETE** - Remove resources

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
   
   Edit `.env` with your configuration:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=1433
   DB_NAME=user_onboarding_db
   DB_USERNAME=sa
   DB_PASSWORD=YourPassword123!
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=24h
   
   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Admin Configuration
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh-token` - Refresh JWT token

### User Management (Admin)
- `GET /api/users/pending` - Get pending users
- `GET /api/users/approved` - Get approved users
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/search` - Search users
- `POST /api/users/:id/approve-reject` - Approve/reject user
- `DELETE /api/users/:id` - Delete user

### User Profile
- `GET /api/users/:id` - Get user details
- `PUT /api/users/profile` - Update profile

### System
- `GET /api/health` - Health check
- `GET /api/queue/stats` - Queue statistics (admin)

## API Usage Examples

### User Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123",
    "phone": "+1234567890"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Approve User (Admin)
```bash
curl -X POST http://localhost:3000/api/users/1/approve-reject \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "action": "approve"
  }'
```

### Reject User (Admin)
```bash
curl -X POST http://localhost:3000/api/users/1/approve-reject \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "action": "reject",
    "rejectionReason": "Incomplete documentation"
  }'
```

## Database Schema

### Users Table
- `id` - Primary key
- `firstName` - User's first name
- `lastName` - User's last name
- `email` - Unique email address
- `password` - Hashed password
- `role` - USER or ADMIN
- `status` - PENDING, APPROVED, or REJECTED
- `phone` - Phone number (optional)
- `dateOfBirth` - Date of birth (optional)
- `profilePicture` - Profile picture URL (optional)
- `lastLoginAt` - Last login timestamp
- `approvedBy` - Admin who approved/rejected
- `approvedAt` - Approval/rejection timestamp
- `rejectionReason` - Reason for rejection
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Background Jobs

The system uses Redis-based queues for background processing:

### Queue Types
1. **Approval Notifications** - Send email notifications for user approval/rejection
2. **Audit Logs** - Log admin actions for compliance
3. **Email Queue** - Handle email sending

### Worker Process
The worker automatically processes jobs in the background. You can also run it separately:

```bash
node src/workers/index.js
```

## Security Features

- **Password Hashing** - bcryptjs with salt rounds
- **JWT Tokens** - Secure authentication tokens
- **Rate Limiting** - Prevent abuse and DDoS
- **CORS Protection** - Cross-origin request security
- **Helmet Security** - Security headers
- **Input Validation** - Request validation with express-validator
- **SQL Injection Protection** - Sequelize ORM protection

## Logging

The application uses Winston for structured logging:

- **Console Logging** - Development environment
- **File Logging** - Production environment
- **Request Logging** - All HTTP requests with Morgan
- **Error Logging** - Separate error log file

Log files are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

## Docker Deployment

1. **Build the image**
   ```bash
   docker build -t user-onboarding-backend .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
     -e DB_HOST=your-db-host \
     -e DB_PASSWORD=your-db-password \
     -e REDIS_HOST=your-redis-host \
     -e JWT_SECRET=your-jwt-secret \
     user-onboarding-backend
   ```

3. **Docker Compose** (recommended)
   ```yaml
   version: '3.8'
   services:
     backend:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DB_HOST=db
         - REDIS_HOST=redis
       depends_on:
         - db
         - redis
     
     db:
       image: mcr.microsoft.com/mssql/server:2019-latest
       environment:
         SA_PASSWORD: YourPassword123!
         ACCEPT_EULA: Y
     
     redis:
       image: redis:alpine
   ```

## Production Considerations

### Environment Variables
Ensure all sensitive environment variables are properly set:
- Use strong `JWT_SECRET`
- Secure database credentials
- Configure proper `CORS` origins
- Set appropriate rate limits

### Database
- Use connection pooling
- Implement proper backup strategy
- Consider read replicas for scaling
- Run migrations instead of sync in production

### Monitoring
- Set up application monitoring (e.g., PM2, New Relic)
- Monitor queue health and Redis performance
- Set up log aggregation (e.g., ELK stack)
- Implement health checks and alerts

### Security
- Use HTTPS in production
- Implement additional security headers
- Regular security audits
- Keep dependencies updated

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Development

```bash
# Development mode with auto-reload
npm run dev

# Lint code
npm run lint

# Format code
npm run format
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify database server is running
   - Check connection credentials in `.env`
   - Ensure network connectivity

2. **Redis Connection Error**
   - Verify Redis server is running
   - Check Redis configuration
   - Ensure Redis is accessible

3. **JWT Token Issues**
   - Verify `JWT_SECRET` is set
   - Check token expiration settings
   - Ensure proper token format in requests

4. **Permission Errors**
   - Verify user roles and permissions
   - Check authentication middleware
   - Ensure admin user exists

### Logs
Check application logs for detailed error information:
```bash
tail -f logs/error.log
tail -f logs/combined.log
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.