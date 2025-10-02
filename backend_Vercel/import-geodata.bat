@echo off
echo 🚀 Importing Nigeria Geographic Data...
echo.

cd /d "%~dp0"
node scripts/import-geodata.js

echo.
echo ✅ Import completed! Press any key to exit...
pause >nul
