@echo off
where base64 >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo You must install the command `base64`
  exit /b 1
)
where docker >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo You must install the command `docker`
  exit /b 1
)