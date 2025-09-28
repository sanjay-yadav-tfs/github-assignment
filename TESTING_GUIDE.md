# User Onboarding & Approval Platform - Test Guide

## 🚀 Application Status
- **Backend**: Running on http://localhost:3000
- **Frontend**: Running on http://localhost:5173
- **Database**: SQLite (development mode)
- **Queue Service**: Mock implementation

## 🔐 Default Admin Account
- **Email**: admin@example.com
- **Password**: admin123

## 🧪 Complete Testing Workflow

### 1. Test User Registration
1. Go to http://localhost:5173
2. Click "Register" or navigate to http://localhost:5173/register
3. Fill out the registration form:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@test.com
   - Password: test123
   - Confirm Password: test123
4. Submit registration
5. You should see: "Registration successful! Please wait for admin approval to login."

### 2. Test Admin Login & Approval
1. Navigate to http://localhost:5173/admin/login
2. Login with admin credentials:
   - Email: admin@example.com
   - Password: admin123
3. You should be redirected to the Admin Dashboard
4. View the pending user (John Doe)
5. Click "Approve" button for the user

### 3. Test User Login (After Approval)
1. Navigate to http://localhost:5173/login
2. Login as the approved user:
   - Email: john.doe@test.com
   - Password: test123
3. You should be logged in and redirected to the Home page
4. Click "Profile" to view user profile with "APPROVED" status

### 4. Test Protected Routes
- Try accessing http://localhost:5173/profile without login (should redirect to login)
- Try accessing http://localhost:5173/admin/dashboard as regular user (should be denied)

## 🔍 API Endpoints Available
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User/Admin login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id/status` - Update user status (admin only)
- `GET /api/users/search` - Search users (admin only)

## 🎯 Key Features Implemented
✅ User Registration with validation
✅ Admin approval workflow
✅ JWT Authentication
✅ Protected routes (user & admin)
✅ User profile management
✅ Admin dashboard with user management
✅ Real-time status updates
✅ Search and filter functionality
✅ Responsive UI with TailwindCSS
✅ Mock notification system
✅ SQLite database integration
✅ Input validation and error handling
✅ Password hashing with bcrypt
✅ Rate limiting for security

## 🛠 Technical Stack
**Backend:**
- Node.js + Express.js
- Sequelize ORM
- SQLite database
- JWT authentication
- bcryptjs password hashing
- express-validator
- helmet + CORS security

**Frontend:**
- React 18
- React Router DOM
- Axios for API calls
- TailwindCSS for styling
- Lucide React icons
- Context API for state management

## � Recent Fixes Applied
- **Fixed API Base URL**: Updated frontend API calls to point to `http://localhost:3000/api`
- **Added Profile Endpoint**: Created `GET /api/users/profile` endpoint in backend
- **Fixed Response Structure**: Corrected frontend to handle backend response format properly

## �🐛 Troubleshooting
If you encounter issues:
1. Check terminal outputs for error messages
2. Verify both servers are running:
   - Backend: http://localhost:3000 
   - Frontend: http://localhost:5173
3. Check browser console for JavaScript errors
4. Ensure backend database is initialized
5. Verify admin user exists in database
6. For profile loading issues: Check browser Network tab for failed API calls