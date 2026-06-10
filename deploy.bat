@echo off
echo ===================================================
echo   Gold Star — Automated Deployment Script
echo ===================================================

echo.
echo 1. Creating backup of development index.html...
copy /y index.html index.html.dev > null

echo 2. Running production build...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Build failed! Aborting deployment.
    del index.html.dev > null
    exit /b %ERRORLEVEL%
)

echo 3. Copying compiled files to root directory...
copy /y dist\index.html .\index.html > null
if not exist assets mkdir assets
xcopy /s /e /y /i dist\assets .\assets > null

echo 4. Staging and committing compiled assets to Git...
"C:\Program Files\Git\cmd\git.exe" add index.html assets
"C:\Program Files\Git\cmd\git.exe" commit -m "deploy: update compiled production build for Hostinger static serving"

echo 5. Force-pushing production assets to main branch...
"C:\Program Files\Git\cmd\git.exe" push origin main

echo 6. Restoring local development environment...
copy /y index.html.dev .\index.html > null
del index.html.dev > null
del null > null

echo.
echo ===================================================
echo   [SUCCESS] Deployment completed successfully!
echo   Hostinger will now serve the compiled site.
echo ===================================================
