@echo off
REM Test runner script for both backend and frontend (Windows)

echo 🧪 Running All Tests...
echo ==========================

echo.
echo 🔧 Testing Backend...
echo --------------------
cd backend
call npm test
set BACKEND_EXIT_CODE=%ERRORLEVEL%

echo.
echo 🎨 Testing Frontend...
echo ---------------------
cd ..\frontend
call npm test
set FRONTEND_EXIT_CODE=%ERRORLEVEL%

echo.
echo 📊 Test Results Summary
echo =======================

if %BACKEND_EXIT_CODE%==0 (
    echo ✅ Backend Tests: PASSED
) else (
    echo ❌ Backend Tests: FAILED
)

if %FRONTEND_EXIT_CODE%==0 (
    echo ✅ Frontend Tests: PASSED
) else (
    echo ❌ Frontend Tests: FAILED
)

echo.
if %BACKEND_EXIT_CODE%==0 if %FRONTEND_EXIT_CODE%==0 (
    echo 🎉 ALL TESTS PASSED!
    exit /b 0
) else (
    echo 💥 SOME TESTS FAILED!
    exit /b 1
)