@echo off
echo Fixing port configuration...

echo Stopping all Node.js processes...
taskkill /F /IM node.exe 2>nul

echo Updating frontend environment...
echo # API Configuration > ut-front-end\.env.local
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:7001 >> ut-front-end\.env.local
echo. >> ut-front-end\.env.local
echo # Google OAuth Configuration >> ut-front-end\.env.local
echo NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here >> ut-front-end\.env.local
echo. >> ut-front-end\.env.local
echo # Stripe Configuration >> ut-front-end\.env.local
echo NEXT_PUBLIC_STRIPE_KEY=your_stripe_publishable_key_here >> ut-front-end\.env.local

echo Starting backend on port 7001...
cd ut-backend
start "Backend Server" cmd /k "npm start"

echo Waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo Starting frontend on port 3000...
cd ../ut-front-end
start "Frontend Server" cmd /k "npm run dev"

echo Both servers should now be running!
echo Backend: http://localhost:7001
echo Frontend: http://localhost:3000
pause
