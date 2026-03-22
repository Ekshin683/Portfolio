@echo off
echo ========================================
echo Starting Portfolio Website
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd Front-end && npm run dev"

echo.
echo ========================================
echo Portfolio Website Starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo IMPORTANT: Make sure MongoDB is running!
echo Start MongoDB with: mongod
echo.
pause
