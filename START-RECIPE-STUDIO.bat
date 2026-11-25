@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install it from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Setting up Recipe Studio for the first time...
  call npm install
  if errorlevel 1 (
    echo Setup did not finish. Check your internet connection and try again.
    pause
    exit /b 1
  )
)
call npm run dev -- --open --host 0.0.0.0
if errorlevel 1 pause
