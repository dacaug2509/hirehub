@echo off
echo Starting HireHub Services...

:: 1. Database Reminder
start "Database Setup" cmd /k "echo Please ensure MySQL is running and you have executed 'database/init.sql'. You can do this by opening your SQL client (Workbench/HeidiSQL) and running the script. & echo. & echo Once DB is ready, this window can be closed."

:: 2. Spring Boot
start "Spring Boot Core" cmd /k "cd hirehub-core && mvn spring-boot:run"

:: 3. .NET Service
start ".NET Referral Service" cmd /k "cd hirehub-referral && dotnet run"

:: 4. React Frontend
start "React Frontend" cmd /k "cd hirehub-web && npm run dev"

echo All services launched in separate windows.
echo Frontend will be available at http://localhost:5173
pause
