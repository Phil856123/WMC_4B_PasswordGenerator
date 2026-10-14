@echo off
setlocal
cd /d "%~dp0"
if not exist "node_modules\commander\package.json" (
  call run.cmd install --ignore-scripts --no-audit --no-fund
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
call run.cmd start -- --length 16 --symbols --count 3
pause
