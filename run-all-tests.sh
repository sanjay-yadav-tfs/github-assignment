#!/bin/bash

# Test runner script for both backend and frontend
echo "🧪 Running All Tests..."
echo "=========================="

echo ""
echo "🔧 Testing Backend..."
echo "--------------------"
cd backend
npm test
BACKEND_EXIT_CODE=$?

echo ""
echo "🎨 Testing Frontend..."
echo "---------------------" 
cd ../frontend
npm test
FRONTEND_EXIT_CODE=$?

echo ""
echo "📊 Test Results Summary"
echo "======================="

if [ $BACKEND_EXIT_CODE -eq 0 ]; then
    echo "✅ Backend Tests: PASSED"
else
    echo "❌ Backend Tests: FAILED"
fi

if [ $FRONTEND_EXIT_CODE -eq 0 ]; then
    echo "✅ Frontend Tests: PASSED"
else
    echo "❌ Frontend Tests: FAILED"
fi

echo ""
if [ $BACKEND_EXIT_CODE -eq 0 ] && [ $FRONTEND_EXIT_CODE -eq 0 ]; then
    echo "🎉 ALL TESTS PASSED!"
    exit 0
else
    echo "💥 SOME TESTS FAILED!"
    exit 1
fi