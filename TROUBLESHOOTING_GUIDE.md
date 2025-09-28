# 🚀 Application Access Guide

## Current Server Status

### ✅ Backend Server (API)
- **URL**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health
- **Admin Login**: http://localhost:3000/api/auth/admin/login
- **API Documentation**: http://localhost:3000/api

### ✅ Frontend Server (React App)
- **URL**: http://localhost:5173
- **Test Page**: http://localhost:5173 (temporarily showing test page)

## 🔍 Troubleshooting Blank Screen

### If Frontend Shows Blank Screen:

1. **Check Browser Console**:
   - Press `F12` in your browser
   - Look for JavaScript errors in Console tab
   - Should see "Main.jsx is loading" message

2. **Direct API Test**:
   - Open: http://localhost:3000/api/health
   - Should show JSON response with server status

3. **Alternative Browser Test**:
   - Try different browser (Chrome, Firefox, Edge)
   - Clear browser cache and cookies

### Current Debug Mode
The frontend is temporarily showing a simple test page instead of the full application to isolate any issues.

## 🛠️ Quick Fixes

### Option 1: Reset and Restart
```powershell
# Stop all servers
taskkill /f /im node.exe

# Start backend
cd "C:\Users\299842\OneDrive - Thermo Fisher Scientific\Desktop\UST\github-assignment\backend"
npm run dev

# Start frontend (in new terminal)
cd "C:\Users\299842\OneDrive - Thermo Fisher Scientific\Desktop\UST\github-assignment\frontend"
npm run dev
```

### Option 2: Direct Backend Test
```powershell
# Test backend API directly
Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method GET
```

### Option 3: Check Dependencies
```powershell
# Frontend dependencies
cd "C:\Users\299842\OneDrive - Thermo Fisher Scientific\Desktop\UST\github-assignment\frontend"
npm install

# Backend dependencies
cd "C:\Users\299842\OneDrive - Thermo Fisher Scientific\Desktop\UST\github-assignment\backend"
npm install
```

## 📱 Mobile/Alternative Access

If VS Code simple browser isn't working:
1. Open your regular browser (Chrome/Firefox/Edge)
2. Navigate to http://localhost:5173
3. Open developer tools (F12) to see console logs

## 🎯 Expected Results

### Test Page Should Show:
- Blue heading "Frontend is Working!"
- Server status information
- Clean, centered layout

### Backend Health Check Should Show:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-09-28T...",
  "environment": "development",
  "database": {
    "type": "sqlite",
    "location": "database/persistent_user_onboarding.db"
  }
}
```

## 🔄 Next Steps

Once the test page is confirmed working:
1. We'll restore the full React application
2. Test user registration and login
3. Verify admin dashboard functionality
4. Confirm database persistence across restarts