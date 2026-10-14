@echo off
setlocal
cd /d "%~dp0"
rem Direkter Node-Pfad umgeht den defekten NVM-Shim auf diesem Rechner.
if exist "%LOCALAPPDATA%\Author Software\nvm\installs\v24.21.0\node.exe" set "PATH=%LOCALAPPDATA%\Author Software\nvm\installs\v24.21.0;%PATH%"
node --version >nul 2>&1
if errorlevel 1 (
  echo Node.js konnte nicht gestartet werden. Bitte Node.js 20 oder neuer installieren.
  exit /b 1
)
if "%~1"=="" (
  echo Aufrufe: run.cmd install / run.cmd test / run.cmd start -- --length 16 --symbols
  exit /b 0
)
call npm.cmd %*
exit /b %errorlevel%
