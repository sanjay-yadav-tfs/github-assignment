# User Onboarding & Approval Platform - Backend

A robust Node.js backend service for managing user onboarding and approval workflows with admin capabilities.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👥 **User Management** - Registration, approval/rejection workflow
- 🛡️ **Role-Based Access Control** - Admin and User roles
- 📊 **Queue System** - Background job processing with Bull/Redis
- 🔍 **User Search & Filtering** - Advanced search capabilities
- 📈 **Statistics & Monitoring** - User stats and queue monitoring
- 🚀 **Production Ready** - Security, logging, rate limiting
- 🐳 **Docker Support** - Containerized deployment

## Tech Stack

- **Runtime**: Node.js + Express.js
- **Database**: MSSQL with Sequelize ORM
- **Authentication**: JWT + bcryptjs
- **Queue**: Bull (Redis-based)
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston + Morgan

## Quick Start

### Prerequisites

- Node.js 18+ 
- MSSQL Server or Azure SQL Database
- Redis Server
- npm or yarn

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
   ```bash
   cp .env.example .env
   ```
   
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