@echo off
echo Starting Blockchain Voting System...
echo.

echo [1/3] Starting Hardhat blockchain node...
start "Hardhat Node" cmd /k "cd backend_Vercel && npx hardhat node"
timeout /t 5 >nul

echo [2/3] Starting Backend server...
start "Backend Server" cmd /k "cd backend_Vercel && npm run dev"
timeout /t 5 >nul

echo [3/3] Starting Frontend webapp...
start "Frontend Webapp" cmd /k "cd VErcel && npm run dev"
timeout /t 3 >nul

echo.
echo ✅ All services started successfully!
echo.
echo 🌐 Access your services:
echo    Frontend:  http://localhost:3000
echo    Backend:   http://localhost:3001
echo    Blockchain: http://localhost:8545
echo.
echo Press any key to close this window...
pause >nul
